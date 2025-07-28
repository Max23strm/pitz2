import React from "react";
import AppLayout from "../components/Layouts/AppLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>{children}</AppLayout>

    );
}