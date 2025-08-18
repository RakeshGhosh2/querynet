// import {db} from "../name"
// import creatQuestionCollection from "./question.collection"
// import createAnswerCollection from "./answer.collection"
// import createCommentCollection from "./comment.collection"
// import createVoteCollection from "./vote.collection"
// import { databases } from "./config"


// export default async function getOrCreateDB() {
//     try {
//         await databases.get (db)
//         console.log("Database connected")
//         } catch (error) {
//             try {
//                 await databases.create (db,db)
//                 console.log("Database created")

//                 await Promise.all([
//                     creatQuestionCollection(),
//                     createAnswerCollection(),
//                     createCommentCollection(),
//                     createVoteCollection(),

//                 ])
//                 console.log("Collections created")
//                 console.log("Database connected")
//             } catch (error) {
//                 console.log(" Error creating database", error)
//             }

//         }
//         return databases

// }



import { db } from "../name";
import creatQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";
import { AppwriteException } from "node-appwrite";

export const runtime = "nodejs";


export default async function getOrCreateDB() {
    try {
        await databases.get(db);  // Try to get the DB
        console.log("Database already exists and connected.");
    } catch (error) {
        if ( error instanceof AppwriteException && error.code === 404) {
            try {
                console.log("Database not found. Trying to create...");
                await databases.create(db, db);
                console.log("Database created");

                await Promise.all([
                    creatQuestionCollection(),
                    createAnswerCollection(),
                    createCommentCollection(),
                    createVoteCollection(),
                ]);

                console.log("Collections created successfully.");
            } catch (creationError) {
                console.error("Error creating database:", creationError);
            }
        } 
        // else {
        //     console.error("Unexpected error getting database:", error);
        // }
    }

    return databases;
}

