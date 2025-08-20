
"use client";

import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/navigation";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { session, hydrated } = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        // Only redirect if we're hydrated and have a session
        if (hydrated && session) {
            router.push('/');
        }
    }, [session, router, hydrated]);

    // Show loading while hydrating
    if (!hydrated) {
        return (
            <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
            <BackgroundBeams />
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

export default Layout;
