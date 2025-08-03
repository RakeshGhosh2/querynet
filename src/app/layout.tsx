// import { Inter } from "next/font/google";
// import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });
// import { cn } from "@/lib/utils";
// import Header from "./components/Header";
// import HeroSectionHeader from "./components/HeroSectionHeader";
// import HeroSection from "./components/HeroSection";
// import Footer from "./components/Footer";


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <body className={cn(inter.className, "dark:bg-black dark:text-white")}>

//         <Header />
//         <HeroSectionHeader />
//         <HeroSection />
//         {/* <LatestQuestions /> */}
//         {/* <TopContributers />   //error */}
//         <Footer /> 

//         {children}</body>
//     </html>
//   );
// }


// src/app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./components/Header";
import HeroSectionHeader from "./components/HeroSectionHeader";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";
import { Globe } from "@/components/magicui/globe";

// ✅ Page metadata for SEO
// export const metadata = {
//   title: "My App",
//   description: "Next.js App with Auth Routing",
// };

const inter = Inter({ subsets: ["latin"] });

// ✅ Server Component Layout (NO 'use client')
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "dark:bg-black dark:text-white")}>
        <Header />
        <HeroSectionHeader />
        <HeroSection />
        <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12 my-10 h-[500px]">
          <div className="md:w-2/3 w-full h-full overflow-y-auto  ">
          LatestQuestion:-
            <LatestQuestions />
          </div>

          <div className="md:w-1/3 w-full h-full overflow-y-auto ">
            <TopContributers />
          </div>
        </div>
  
        <Footer />
        {children}
      </body>
    </html>
  );
}


