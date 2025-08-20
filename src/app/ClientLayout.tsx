"use client";

import React from "react";
import { useAuthStore } from "@/store/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { hydrated, verifySession } = useAuthStore();

    React.useEffect(() => {
        if (hydrated) {
            verifySession();
        }
    }, [hydrated, verifySession]);

    // Show loading state until hydrated
    if (!hydrated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}