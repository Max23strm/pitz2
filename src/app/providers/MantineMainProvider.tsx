"use client";

import { createTheme, MantineProvider } from "@mantine/core";
import React from "react";

const MantineMainProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    fontFamily: "DM Sans, sans-serif",
    fontFamilyMonospace: "Space Grotesk, Courier, monospace",
    headings: { fontFamily: "Rajdhani, sans-serif" },
  });

  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      {children}
    </MantineProvider>
  );
};

export default MantineMainProvider;
