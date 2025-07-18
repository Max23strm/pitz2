'use client'
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../Navigation/NavBar";
import TopNavBar from "../Navigation/TopNavBar";
import styles from '../Navigation/styles/TopNavBar.module.css'
import BreadCrumbs from "../Navigation/BreadCrumbs";


function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShellHeader className={styles.header_con_logo}>
        <TopNavBar opened={opened} onClick={toggle} />
      </AppShellHeader>

      <AppShellNavbar p="md">
        <NavBar toogleClick={close}/>
      </AppShellNavbar>

      <AppShellMain>
        <BreadCrumbs/>
        {children}
      </AppShellMain>
    </AppShell>
  );
}

export default AppLayout;
