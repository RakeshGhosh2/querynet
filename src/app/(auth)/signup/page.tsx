"use client";
import { useAuthStore } from "@/store/Auth";
import React from "react";

function RegisterPage() {
    const { createAccount, login } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //collect form data
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");

        // validate
        if (!email || !password || !firstname || !lastname) {
            setError(() => "Please fill in all fields");
            return;
        }

        // call the store
        setIsLoading(true);
        setError("")
        const response = await createAccount(
            ` ${firstname} ${lastname}`,
            email?.toString(),
            password?.toString()
        )
        if (response.error) {
            setError(() => response.error!.message);
        } else {
            const loginResponse = await login(email.toString(), password.toString());
            if (loginResponse.error) {
                setError(() => loginResponse.error!.message);
            }
        }
        setIsLoading(() => false);

    }



    return (
        <div>
            {error && (
                <p>{error}</p>
            )}
        <form onSubmit={handleRegister}>

        </form>
        </div>
    )
}
export default RegisterPage;