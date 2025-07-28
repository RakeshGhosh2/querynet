"use client";
import { useAuthStore } from "@/store/Auth";
import React from "react";

function LoginPage() {

    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //collect form data
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");


        // validate
        if (!email || !password) {
            setError(() => "Please fill in all fields");
            return;
        }

        // call the store
        setIsLoading(() => true);
        setError(() => "")

        const loginResponse = await login(email.toString(), password.toString());
        if (loginResponse.error) {
            setError(() => loginResponse.error!.message);
        }

        setIsLoading(() => false);
    };

    return (
        <div>
            login
        </div>
    )
}
export default LoginPage;