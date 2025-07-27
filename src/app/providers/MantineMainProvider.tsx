"use client";

import { generateColors } from "@mantine/colors-generator";
import { MantineProvider } from "@mantine/core";
import React from "react";

const MantineMainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      defaultColorScheme="auto"
      theme={{
        colors: {
          "primary-pitz": generateColors("#0C5C7A"),
          "secondary-pitz": generateColors("#39BBD5"),
          "accent-pitz": generateColors("#F15A29"),
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default MantineMainProvider;
