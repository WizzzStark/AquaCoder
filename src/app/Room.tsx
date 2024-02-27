"use client";

import { ReactNode, useMemo } from "react";
import { RoomProvider  } from "@/liveblocks.config";
import { useSearchParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "@/components/Loading";
import { createRoomId } from "@/lib/createRoomId";

export function Room({ children }: { children: ReactNode }) {
  const roomId = 'AquaCoder-' + createRoomId()

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}