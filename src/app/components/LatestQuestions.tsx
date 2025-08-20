
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
            
//             {questions.documents.map(question => (
//                 <QuestionCard key={question.$id} ques={question} />
//             ))}
//         </div>
//     );
// };

// export default LatestQuestions;


// LatestQuestions.tsx
import QuestionCard from "@/components/QuestionCard";
import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config"; // server SDK
import { UserPrefs } from "@/store/Auth";
import { Models, Query } from "node-appwrite";
import React from "react";

// Interfaces
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

// Server Component
const LatestQuestions = async () => {
    const questions = await databases.listDocuments<Question>(db, questionCollection, [
        Query.limit(5),
        Query.orderDesc("$createdAt"),
    ]);

    questions.documents = await Promise.all(
        questions.documents.map(async (ques) => {
            const [author, answers, votes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
                databases.listDocuments(db, answerCollection, [
                    Query.equal("questionId", ques.$id),
                    Query.limit(1),
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", "question"),
                    Query.equal("typeId", ques.$id),
                    Query.limit(1),
                ]),
            ]);

            return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: votes.total,
                author: {
                    $id: author.$id,
                    reputation: author.prefs.reputation,
                    name: author.name,
                    email: author.email, // optional if needed
                },
            } as Question;
        })
    );

    return (
        <div className="space-y-6">
            {questions.documents.map((question) => (
                <QuestionCard key={question.$id} ques={question} />
            ))}
        </div>
    );
};

export default LatestQuestions;
