// app/layout.tsx
import { Providers } from "@/lib/providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
