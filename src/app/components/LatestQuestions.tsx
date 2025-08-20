// export const dynamic = "force-dynamic";
// import QuestionCard from "@/components/QuestionCard";
// import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
// import { databases, users } from "@/models/server/config";
// import { UserPrefs } from "@/store/Auth";
// import { Models, Query } from "node-appwrite";
// import React from "react";


// // Define interface for User and Question
// interface User extends Models.Document {
//     name: string;
//     email: string;
//     reputation: number;
// }

// interface Question extends Models.Document {
//     title: string;
//     content: string;
//     authorId: string;
//     author: User;
//     tags: string[];
//     attachmentId?: string;
//     totalVotes: number;
//     totalAnswers: number;
// }

// const LatestQuestions = async () => {
//     const questions =  await databases.listDocuments<Question>(db, questionCollection, [
//         Query.limit(5),
//         Query.orderDesc("$createdAt"),
//     ]);
//     console.log("Fetched Questions:", questions);

//     questions.documents = await Promise.all(
//         questions.documents.map(async ques => {
//             const [author, answers, votes] = await Promise.all([
//                 users.get<UserPrefs>(ques.authorId),
//                 databases.listDocuments(db, answerCollection, [
//                     Query.equal("questionId", ques.$id),
//                     Query.limit(1), // for optimization
//                 ]),
//                 databases.listDocuments(db, voteCollection, [
//                     Query.equal("type", "question"),
//                     Query.equal("typeId", ques.$id),
//                     Query.limit(1), // for optimization
//                 ]),
//             ]);

//             return {
//                 ...ques,
//                 totalAnswers: answers.total,
//                 totalVotes: votes.total,
//                 author: {
//                     $id: author.$id,
//                     reputation: author.prefs.reputation,
//                     name: author.name,
//                 },
//             } as Question;
//         })
//     );

//     console.log("Latest question")
//     console.log(questions)
//     return (
//         <div className="space-y-6">

//             {questions.documents.map((question) => (
//                 <QuestionCard key={question.$id} ques={question} />
//             ))}
//         </div>
//     );
// };

// export default LatestQuestions;



// src/app/components/LatestQuestions.tsx
export const dynamic = "force-dynamic";
export const revalidate = 10; // seconds


import { databases, users } from "@/models/server/config";
import {
    answerCollection,
    db,
    voteCollection,
    questionCollection,
} from "@/models/name";
import { Models, Query } from "node-appwrite";
import React from "react";
import QuestionCard from "@/components/QuestionCard";
import { UserPrefs } from "@/store/Auth";

// Define interface for User and Question
interface User extends Models.Document {
    name: string;
    email: string;
    reputation: number;
}

interface Question extends Models.Document {
    title: string;
    content: string;
    authorId: string;
    author: User;
    tags: string[];
    attachmentId?: string;
    totalVotes: number;
    totalAnswers: number;
}

interface LatestQuestionsProps {
    searchParams?: { 
        page?: string; 
        tag?: string; 
        search?: string; 
    };
    limit?: number;
    showPagination?: boolean;
}

const LatestQuestions = async ({ 
    searchParams = {}, 
    limit = 5, 
    showPagination = false 
}: LatestQuestionsProps) => {
    try {
        const page = searchParams?.page ?? "1";
        const queries = [
            Query.orderDesc("$createdAt"),
            Query.offset((+page - 1) * limit),
            Query.limit(limit),
        ];

        // Add search filters if provided
        if (searchParams.tag) {
            queries.push(Query.equal("tags", searchParams.tag));
        }

        if (searchParams.search) {
            queries.push(
                Query.or([
                    Query.search("title", searchParams.search),
                    Query.search("content", searchParams.search),
                ])
            );
        }

        console.log("Fetching questions with queries:", queries);

        const questions = await databases.listDocuments<Question>(
            db,
            questionCollection,
            queries
        );

        console.log("Raw questions fetched:", questions.total);

        if (!questions.documents || questions.documents.length === 0) {
            return (
                <div className="space-y-6">
                    <div className="text-center text-gray-500 py-8">
                        <p>No questions found.</p>
                    </div>
                </div>
            );
        }

        // Fetch additional data for each question
        const questionsWithDetails = await Promise.all(
            questions.documents.map(async (ques) => {
                try {
                    const [author, answers, votes] = await Promise.all([
                        users.get<UserPrefs>(ques.authorId).catch(err => {
                            console.error(`Error fetching user ${ques.authorId}:`, err);
                            return {
                                $id: ques.authorId,
                                name: "Unknown User",
                                prefs: { reputation: 0 }
                            };
                        }),
                        databases.listDocuments(db, answerCollection, [
                            Query.equal("questionId", ques.$id),
                            Query.limit(1),
                        ]).catch(err => {
                            console.error(`Error fetching answers for ${ques.$id}:`, err);
                            return { total: 0 };
                        }),
                        databases.listDocuments(db, voteCollection, [
                            Query.equal("type", "question"),
                            Query.equal("typeId", ques.$id),
                            Query.limit(1),
                        ]).catch(err => {
                            console.error(`Error fetching votes for ${ques.$id}:`, err);
                            return { total: 0 };
                        }),
                    ]);

                    return {
                        ...ques,
                        totalAnswers: answers.total || 0,
                        totalVotes: votes.total || 0,
                        author: {
                            $id: author.$id,
                            reputation: author.prefs?.reputation || 0,
                            name: author.name || "Unknown User",
                        },
                    } as Question;
                } catch (error) {
                    console.error(`Error processing question ${ques.$id}:`, error);
                    return {
                        ...ques,
                        totalAnswers: 0,
                        totalVotes: 0,
                        author: {
                            $id: ques.authorId,
                            reputation: 0,
                            name: "Unknown User",
                        },
                    } as Question;
                }
            })
        );

        console.log("Questions with details processed:", questionsWithDetails.length);

        return (
            <div className="space-y-6">
                {questionsWithDetails.map((ques) => (
                    <QuestionCard key={ques.$id} ques={ques} />
                ))}
                {questionsWithDetails.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        <p>No questions available at the moment.</p>
                    </div>
                )}
            </div>
        );

    } catch (error) {
        console.error("Error in LatestQuestions component:", error);

        return (
            <div className="space-y-6">
                <div className="text-center text-red-500 py-8">
                    <p>Error loading questions. Please try again later.</p>
                    <small className="text-gray-500">
                        {error instanceof Error ? error.message : "Unknown error"}
                    </small>
                </div>
            </div>
        );
    }
};

export default LatestQuestions;





