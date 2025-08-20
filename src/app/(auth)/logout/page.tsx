

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import toast from "react-hot-toast";

export default function Logout() {
    const { logout, session } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            try {
                if (session) {
                    await logout(); // This will handle the redirect internally
                    toast.success("Logged out successfully!");
                } else {
                    // If no session, redirect immediately
                    router.push("/");
                    setTimeout(() => {
                        if (typeof window !== 'undefined') {
                            window.location.href = '/';
                        }
                    }, 100);
                }
            } catch (error) {
                console.error("Logout error:", error);
                toast.error("Logout failed");
                // Redirect anyway
                router.push("/");
                setTimeout(() => {
                    if (typeof window !== 'undefined') {
                        window.location.href = '/';
                    }
                }, 100);
            }
        };

        performLogout();
    }, [logout, router, session]);
    console.log("log out successfully ->")

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Logging out...</p>
            </div>
        </div>
    );
}