export const runtime = "nodejs";

import { Permission } from "appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";
import { AppwriteException } from "appwrite";

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
