
import env from "@/app/env";
import { Account, Avatars, Client, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId);

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { client, databases, account, storage, avatars };