import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { databases } from "@/models/server/config";
import { db, questionAttachmentBucket, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import slugify from "@/utils/slugify";
import { storage } from "@/models/client/config";
import HeroSectionHeader from "./HeroSectionHeader";

export default function HeroSection() {
  //add asyne if needed
  // const questions = await databases.listDocuments(db, questionCollection, [
  //     Query.orderDesc("$createdAt"),
  //     Query.limit(15),
  // ]);

  return (
    // <HeroParallax
    //     header={<HeroSectionHeader />}
    //     products={questions.documents.map(q => ({
    //         title: q.title,
    //         link: `/questions/${q.$id}/${slugify(q.title)}`,
    //         thumbnail: storage.getFilePreview(questionAttachmentBucket, q.attachmentId),//href
    //     }))}
    // />
    <HeroParallax products={products} />
  );
}


export const products = [
  {
    title: "Moonbeam",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/1200x/7d/01/bf/7d01bfd8b503e6ac2a9999b52198bfd9.jpg",



  },
  {
    title: "Cursor",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/736x/25/a0/65/25a065834a5f60062bdbf8d11e82619e.jpg",
  },
  {
    title: "Rogue",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/736x/f8/b5/64/f8b564a4d2055bf4a140b9dea74521e9.jpg",

  },

  {
    title: "Editorially",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/1200x/b2/6b/5b/b26b5b4f274e7054527f5f0dadaa0dc1.jpg",


  },
  {
    title: "Editrix AI",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/1200x/81/29/92/812992f44a2cd6e6787b8b61209abf48.jpg",
  },
  {
    title: "Pixel Perfect",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/736x/f0/e4/2e/f0e42ea7ab4462e5a2ff86fa57f468c0.jpg",
  },

  {
    title: "Algochurn",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/736x/ee/6c/88/ee6c88ef44f7eefe3846484a1107b001.jpg",

  },
  {
    title: "Aceternity UI",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/1200x/7d/01/bf/7d01bfd8b503e6ac2a9999b52198bfd9.jpg",

  },
  {
    title: "Tailwind Master Kit",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/736x/ee/6c/88/ee6c88ef44f7eefe3846484a1107b001.jpg",



  },
  {
    title: "SmartBridge",
    link: "/",
    thumbnail:
      "https://i.pinimg.com/736x/ee/6c/88/ee6c88ef44f7eefe3846484a1107b001.jpg",


  },



];

