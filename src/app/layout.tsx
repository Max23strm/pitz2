// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import AppLayout from "./components/Layouts/AppLayout";
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import MantineMainProvider from "./providers/MantineMainProvider";
export const metadata = {
  title: "Pitz rugby club",
  description: "Club de rugby Cancún",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineMainProvider>
          <Notifications/>
          <AppLayout>{children}</AppLayout>
        </MantineMainProvider>
      </body>
    </html>
  );
}
