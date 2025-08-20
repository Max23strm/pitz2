"use client";

import { generateColors } from "@mantine/colors-generator";
import { createTheme, MantineProvider } from "@mantine/core";
import React from "react";

const MantineMainProvider = ({ children }: { children: React.ReactNode }) => {

  const theme = createTheme({
    primaryColor: 'primary-pitz',
        defaultGradient: {from: 'indigo', to: 'primary-pitz', deg: 95},
        defaultRadius:'md',
        colors: {
          "primary-pitz": generateColors("#0C5C7A"),
          "secondary-pitz": generateColors("#39BBD5"),
          "accent-pitz": generateColors("#F15A29"),
        },
  });

  return (
    <MantineProvider
      defaultColorScheme="auto"
      theme={theme}
    >
      {children}
    </MantineProvider>
  );
};

export default MantineMainProvider;
