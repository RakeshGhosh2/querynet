
"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import { BorderBeam } from "@/components/magicui/border-beam";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};

export default function Register() {
    const { login, createAccount } = useAuthStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const email = formData.get("email");
        const password = formData.get("password");

        if (!firstname || !lastname || !email || !password) {
            setError("Please fill out all fields");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await createAccount(
                `${firstname} ${lastname}`,
                email.toString(),
                password.toString()
            );

            if (response.error) {
                toast.error(response.error.message || "Signup failed");
                setError(response.error.message || "Signup failed");
            } else {
                toast.success("Account created successfully!");
                
                // Auto login after successful registration
                const loginResponse = await login(email.toString(), password.toString());
                if (loginResponse.error) {
                    setError(loginResponse.error.message);
                    toast.error("Registration successful, but login failed. Please try logging in manually.");
                } else {
                    toast.success("Logged in successfully!");
                    
                    // Force redirect after successful login
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 500);
                }
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("Registration failed. Please try again.");
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    console.log("signup successfully ->")
      
    return (
        <div className="mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
            <h2 className="text-xl text-center font-bold text-neutral-800 dark:text-neutral-200">
                Welcome to QueryNet
            </h2>
            {error && (
                <p className="mt-8 text-center text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
            <form className="my-8" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input 
                            className="text-black" 
                            id="firstname" 
                            name="firstname" 
                            placeholder="Rakesh" 
                            type="text"
                            disabled={isLoading}
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input 
                            className="text-black" 
                            id="lastname" 
                            name="lastname" 
                            placeholder="Ghosh" 
                            type="text"
                            disabled={isLoading}
                            required
                        />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        className="text-black"
                        id="email"
                        name="email"
                        placeholder="rakeshghosh@gmail.com"
                        type="email"
                        disabled={isLoading}
                        required
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        className="text-black" 
                        id="password" 
                        name="password" 
                        placeholder="••••••••" 
                        type="password"
                        disabled={isLoading}
                        required
                        minLength={8}
                    />
                </LabelInputContainer>

                <button
                    className="group/btn cursor-pointer relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]
                    dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating account..." : "Sign up"} &rarr;
                    <BottomGradient />
                </button>

                <div className="text-center mt-4">
                    <Link
                        href="/login"
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 hover:underline"
                    >
                        If you already have an account, login to QueryNet
                    </Link>
                </div>

                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            </form>
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