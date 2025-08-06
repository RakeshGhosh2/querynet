"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function Logout() {
    const { logout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            await logout(); // Clear session, user, and jwt in Zustand + Appwrite
            router.push("/login"); // Redirect to login page after logout
        };

        performLogout();
    }, []);

    return (
        <div>

        </div>
    );
}
