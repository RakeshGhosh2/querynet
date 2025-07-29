import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";
import { AppwriteException } from "node-appwrite";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage Connected");
    } catch (error) {
        if (error instanceof AppwriteException && error.code === 404) {
            try {
                await storage.createBucket(
                    questionAttachmentBucket,
                    questionAttachmentBucket,
                    [
                        Permission.create("users"),
                        Permission.read("any"),
                        Permission.read("users"),
                        Permission.update("users"),
                        Permission.delete("users"),
                    ],
                    false,
                    undefined,
                    undefined,
                    ["jpg", "png", "gif", "jpeg", "webp", "heic"]
                );

                console.log("Storage Created");
                console.log("Storage Connected");
            } catch (error) {
                console.error("Error creating storage:", error);
            }
        }
    }
}


// import { Permission, Role } from "node-appwrite";
// import { questionAttachmentBucket } from "../name";
// import { storage } from "./config";

// export default async function getOrCreateStorage() {
//     try {
//         // Try fetching the existing bucket
//         await storage.getBucket(questionAttachmentBucket);
//         console.log("Storage Connected");
//     } catch (error: any) {
//         if (error.code === 404) {
//             try {
//                 await storage.createBucket(
//                     questionAttachmentBucket,       // bucketId
//                     questionAttachmentBucket,       // name
//                     [
//                         Permission.read(Role.any()),      // Public read
//                         Permission.read(Role.users()),    // Users can read
//                         Permission.update(Role.users()),  // Users can update
//                         Permission.delete(Role.users()),  // Users can delete
//                     ],
//                     false,                            // fileSecurity (disable)
//                     "auto",                           // enabled
//                     "file",                           // type (can be 'file' or 'image')
//                     ["jpg", "png", "gif", "jpeg", "webp", "heic"] // allowed file extensions
//                 );

//                 console.log("Storage Created");
//                 console.log("Storage Connected");
//             } catch (error) {
//                 console.error("❌ Error creating storage:", error);
//             }
//         } else {
//             console.error("❌ Error accessing bucket:", error);
//         }
//     }
// }
