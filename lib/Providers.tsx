// app/providers.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeWrapper } from "@/lib/themeWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeWrapper
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeWrapper>
    </ClerkProvider>
  );
}
