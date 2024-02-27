import "../globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: "AquaCoder",
  description: "Interactive in real time coding website with other users with mermaid interpreter",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Toaster 
          position="bottom-center"  
          richColors
        />
      <body>
        <link rel="icon" href="/favicon2.ico" sizes="any" />
        {children}
        <Analytics />
        </body>
    </html>
  );
}
