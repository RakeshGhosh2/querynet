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
        <div className="mx-auto mt-24 w-full max-w-md rounded-xl border border-white/20 bg-white p-6 text-center shadow-md dark:bg-black">
            <h1 className="text-2xl font-semibold text-black dark:text-white">
                Logging you out...
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                You’ll be redirected shortly.
            </p>

            <BorderBeam
                duration={6}
                size={400}
                className="from-transparent via-red-500 to-transparent"
            />
            <BorderBeam
                duration={6}
                delay={3}
                size={400}
                borderWidth={2}
                className="from-transparent via-blue-500 to-transparent"
            />
        </div>
    );
}
