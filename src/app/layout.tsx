
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
// import { CopilotKit } from "@copilotkit/react-core";
// import "@copilotkit/react-ui/styles.css";
import React from "react";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QueryNet",
  description: "Welcome to QueryNet",
  icons: {
    icon: "/querynet/public/images/querynet2.png",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className="dark">

    //   <body className={cn(inter.className, "dark:bg-black dark:text-white")}>


    //     <Header />
    //     <CopilotKit publicApiKey={process.env.API_KEY}>
    //       {children}
    //     </CopilotKit>
    //     <Toaster
    //       position="top-center"
    //       reverseOrder={false}
    //     />
    //     <Footer />


    //   </body>
    // </html>



    <html lang="en" className="dark">
      <body className={cn(inter.className, "dark:bg-black dark:text-white")}>
        <Header />
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Footer />
      </body>
    </html>
  );
}


