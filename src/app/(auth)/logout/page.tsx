"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

export default function Logout() {
    const { logout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            await logout(); // Clear session, user, and jwt in Zustand + Appwrite
            router.push("/"); // Redirect to login page after logout
        };

        performLogout();
    }, [logout, router]);

    return (
        <div>

        </div>
    );
}
