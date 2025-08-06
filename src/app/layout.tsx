
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


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "dark:bg-black dark:text-white")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}


