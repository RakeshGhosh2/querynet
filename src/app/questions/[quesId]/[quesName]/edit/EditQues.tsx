"use client";

import QuestionForm from "@/components/QuestionForm";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import React from "react";


const EditQues = ({ question }: { question: Models.Document  & Record<string, any>}) => {
    const { user } = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        if (question.authorId !== user?.$id) {
            router.push(`/questions/${question.$id}/${slugify(question.title)}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);//change

    if (user?.$id !== question.authorId) return null;

    return (
        <CopilotSidebar
            defaultOpen={false}
            instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
            labels={{
                title: "QueryNet Helper",
                initial: "How can I help you today?",
            }}
        >
            <div className="flex min-h-screen items-center justify-center py-20 px-4">
                <div className="w-full max-w-4xl">
                    <h1 className="mb-10 text-2xl text-center">Edit your public question</h1>
                    <QuestionForm question={question} />
                </div>
            </div>
        </CopilotSidebar>
    );
};

export default EditQues;
