
"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

type ThemeWrapperProps = React.ComponentProps<typeof ThemeProvider>;

export function ThemeWrapper({ children, ...props }: ThemeWrapperProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
