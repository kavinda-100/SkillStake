import { Header } from "@/components/Header";
import React from "react";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full min-h-screen max-w-500 mx-auto">
            <Header />
            {children}
        </main>
    );
}
