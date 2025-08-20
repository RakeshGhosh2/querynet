"use client";

import QuestionForm from "@/components/QuestionForm";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";
import { useRouter } from "next/navigation";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditQues = ({ question }: { question: any }) => {
    const { user } = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        if (question.authorId !== user?.$id) {
            router.push(`/questions/${question.$id}/${slugify(question.title)}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (user?.$id !== question.authorId) return null;
    console.log("Edit successfull->")

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="w-full max-w-4xl p-6  rounded-xl shadow-lg">
                <h1 className="mb-6 text-2xl text-center font-bold">Edit your public question</h1>
                <QuestionForm question={question} />
            </div>
        </div>

    );
};

export default EditQues;
