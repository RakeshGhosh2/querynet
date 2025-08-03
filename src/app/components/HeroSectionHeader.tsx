"use client";

import { IconCloud } from "@/components/magicui/icon-cloud";
import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import React from "react";
import ColourfulText from "@/components/ui/colourful-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
];

const words=`Join QueryNet — a global developer community where developers ask, share, and collaborate to level up their coding skills and build amazing projects together!`
const HeroSectionHeader = () => {
    const { session } = useAuthStore();
    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
    );

    return (
        <div className="container mx-auto px-4 top-0">
            <Particles
                className="fixed inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />
            <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-center">
                    <div className="space-y-4 text-center">
                        <h1 className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
                        <ColourfulText text="QueryNet" /> 
                        </h1>
                        <div className="max-w-xl mx-auto text-center text-2xl font-semibold leading-snug tracking-wide text-gray-800 dark:text-gray-200">
                            <TextGenerateEffect duration={2} filter={false} words= {words}/>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            {session ? (
                                <Link href="/questions/ask">
                                    <ShimmerButton className="shadow-2xl">
                                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                            Ask a question
                                        </span>
                                    </ShimmerButton>
                                </Link>
                            ) : (
                                <>
                                <Link href="/login">
                                        <ShimmerButton className="shadow-2xl">
                                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                                Login
                                            </span>
                                        </ShimmerButton>
                                    </Link>

                                    <Link href="/register">
                                        <ShimmerButton className="shadow-2xl">
                                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                                Sign up
                                            </span>
                                        </ShimmerButton>
                                    </Link>
                                    {/* <Link
                                        href="/login"
                                        className="relative rounded-full border border-neutral-200 px-8 py-3 font-medium text-black dark:border-white/[0.2] dark:text-white"
                                    >
                                        <span>Login</span>
                                        <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                                    </Link> */}
                                    
                                </>
                            )}
                        </div>
                    </div>
                </div>


                <div className="relative flex size-full items-center justify-center overflow-hidden">
                    <IconCloud images={images} iconSlugs={[]} />
                </div>
            </div>
        </div>
    );
};

export default HeroSectionHeader;
