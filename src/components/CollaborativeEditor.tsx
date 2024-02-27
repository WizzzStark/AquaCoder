"use client";

import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { TypedLiveblocksProvider, useRoom } from "@/liveblocks.config";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from "@/components/Avatars";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import { Cursors } from "@/components/Cursors";
import { Toolbar } from "@/components/Toolbar";
import mermaid from "mermaid";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Popup from "./PopUp";

export function CollaborativeEditor() {
  const room = useRoom();
  const [provider, setProvider] = useState<TypedLiveblocksProvider>();
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
  const [editorText, setEditorText] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState<Boolean>(true);
	const handleClosePopup = () => {
		setIsPopupOpen(false)
	}

  useEffect(() => {
    hanldeMermaidInitialize();
  }, []);

  useEffect(() => {
    let yProvider: TypedLiveblocksProvider;
    let yDoc: Y.Doc;
    let binding: MonacoBinding;

    if (editorRef) {
      yDoc = new Y.Doc();
      const yText = yDoc.getText("monaco");
      yProvider = new LiveblocksProvider(room, yDoc);
      setProvider(yProvider);

      binding = new MonacoBinding(
        yText,
        editorRef.getModel() as editor.ITextModel,
        new Set([editorRef]),
        yProvider.awareness as Awareness
      );
    }

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
      binding?.destroy();
    };
  }, [editorRef, room]);

  const hanldeMermaidInitialize = () => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeCSS: ".node rect { fill: #333; } .edgeLabel { background-color: #333; }",
    });
  };


  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);

    e.onDidChangeModelContent(() => {
      setEditorText(e.getValue());
    });
  }, []);


  const [mermaidHistory, setMermaidHistory] = useState<string[]>([]);
  const [mermaidText, setMermaidText] = useState("");
  const [isMermaidSyntaxValid, setIsMermaidSyntaxValid] = useState(false);

  /**
   * Maneja los cambios en el texto del editor para actualizar el diagrama de Mermaid.
   * Si el nuevo texto es sintácticamente válido según Mermaid, actualiza el texto del diagrama.
   * Si el texto no es válido, revierte al último texto válido conocido.
   * Si no hay texto válido anterior, se limpia el texto del diagrama.
   */
  const handleMermaidTextChange = async () => {
    if (editorText.length === 0) return;

    const fallbackText = mermaidHistory.length > 0 ? mermaidHistory[mermaidHistory.length - 1] : "";

    try {
      const isValid = await validateMermaidSyntax();

      if (isValid) {
        setIsMermaidSyntaxValid(true);
        mermaidHistory.push(editorText);
        setMermaidText(editorText);
        
      } else {
        setIsMermaidSyntaxValid(false);
        setMermaidText(fallbackText);
      }
    } catch (error) {
      console.log("Error al validar la sintaxis de Mermaid:", error);
      setIsMermaidSyntaxValid(false);
      setMermaidText(fallbackText);
    }
  };

  const validateMermaidSyntax = async () => {
    return await mermaid.parse(editorText);
  };


  // Actualizar texto de mermaid cada vez que se produce un cambio
  useEffect(() => {
    handleMermaidTextChange();
  }, [editorText]);

  // Actualizar el diagrama si el cambio de mermaid es válido
  useEffect(() => {
    document.querySelectorAll(".mermaid").forEach((el) => {
      el.removeAttribute("data-processed");
    });
    hanldeMermaidInitialize();
    if (isMermaidSyntaxValid) {
      mermaid.run().then(() => {
        console.debug("Rendering mermaid diagram");
      });
    }
  }, [mermaidText]);

  return (
    <div className={`${styles.container}`}>
      {isPopupOpen && <Popup closePopUp={handleClosePopup} />}


      {provider ? <Cursors yProvider={provider} /> : null}
      <div className={`${styles.editorHeader} bg-[#1E1E1E]`}>
        <div>
          {editorRef ? <Toolbar editor={editorRef} /> : null}
        </div>
        <Avatars />
      </div>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className={styles.editorContainer}>
          <Editor
            onMount={handleOnMount}
            height="100%"
            width="100%"
            theme="vs-dark"
            defaultLanguage="markdown"
            defaultValue=""
            options={{
              tabSize: 4,
              padding: { top: 20 },
            }}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="bg-[#1E1E1E] p-4 text-white">
        <pre className="mermaid">{mermaidText}</pre>
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className={`absolute bottom-10 px-4 py-1 rounded-md ${isMermaidSyntaxValid ? ' bg-[#71f78e] left-[45%]' : 'bg-red-500 left-[39%]'}`}>
            {mermaidText.length > 0 && (
              <p className={`font-sans font-semibold text-[20px] text-black`}>
                {isMermaidSyntaxValid
                  ? "Valid Syntax"
                  : "Invalid Syntax, showing latest valid diagram"}
              </p>
            )}
        </div>
    </div>
  );
}