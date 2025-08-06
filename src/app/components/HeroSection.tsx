import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

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
      "https://i.pinimg.com/736x/49/9b/0d/499b0df9b88820a893dbd9edf4031b7a.jpg",

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

export default function HeroSection() {
  
  return (
    
    <HeroParallax products={products} />
  );
}

