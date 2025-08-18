// "use client";
// import React from "react";
// import { IconHome, IconMessage, IconWorldQuestion } from "@tabler/icons-react";
// import { useAuthStore } from "@/store/Auth";
// import slugify from "@/utils/slugify";
// import {
//     Navbar,
//     NavBody,
//     NavItems,
//     MobileNav,
//     NavbarLogo,
//     NavbarButton,
//     MobileNavHeader,
//     MobileNavToggle,
//     MobileNavMenu,
// } from "@/components/ui/resizable-navbar";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import Link from "next/link";
// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function Header() {
//     const { user, session } = useAuthStore();

//     const navItems = [
//         {
//             name: "Home",
//             link: "/",
//             icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
//         },
//     ];
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     if (user)
//         navItems.push({

//             name: "Questions",
//             link: "/questions",
//             icon: <IconWorldQuestion className="h-4 w-4 text-neutral-500 dark:text-white" />
//         }, {
//             name: "Profile",
//             link: `/users/${user.$id}/${slugify(user.name)}`,
//             icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
//         },

//     );

//     // function logout() {
//     //     throw new Error("Function not implemented.");
//     // }

//     function handleLogout() {
//         toast.success("Logged out successfully!");
//     }

//     // function handleLogin() {
//     //     toast.success("Logged in successfully!");
//     // }

//     // function handleSignUp() {
//     //     toast.success("Account created successfully!");
//     // }

//     return (

//         <div className="relative w-full top-5">
//             <Navbar>
//                 {/* Desktop Navigation */}
//                 <NavBody>
//                     <NavbarLogo />
//                     <NavItems items={navItems} />
//                     <div className="flex items-center gap-4">
//                         {session ? (
//                             <><AlertDialog>
//                                 <AlertDialogTrigger>
//                                     <NavbarButton variant="primary">Logout</NavbarButton>
//                                 </AlertDialogTrigger>
//                                 <AlertDialogContent>
//                                     <AlertDialogHeader>
//                                         <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
//                                         <AlertDialogDescription>
//                                             This will end your current session and redirect you to the login page.
//                                         </AlertDialogDescription>
//                                     </AlertDialogHeader>
//                                     <AlertDialogFooter>
//                                         <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
//                                         <Link href="/logout" onClick={handleLogout}>
//                                             <AlertDialogAction className="cursor-pointer"  >Logout</AlertDialogAction>
//                                         </Link>

//                                     </AlertDialogFooter>
//                                 </AlertDialogContent>
//                             </AlertDialog></>

//                         ) : (
//                             <><NavbarButton variant="primary" href="/login"  >Login</NavbarButton>
//                                 <NavbarButton variant="primary" href="/register" >Sign up</NavbarButton></>
//                         )}

//                     </div>
//                 </NavBody>

//                 {/* Mobile Navigation */}
//                 <MobileNav>
//                     <MobileNavHeader>
//                         <NavbarLogo />
//                         <MobileNavToggle
//                             isOpen={isMobileMenuOpen}
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                         />
//                     </MobileNavHeader>

//                     <MobileNavMenu
//                         isOpen={isMobileMenuOpen}
//                         onClose={() => setIsMobileMenuOpen(false)}
//                     >
//                         {navItems.map((item, idx) => (
//                             <a
//                                 key={`mobile-link-${idx}`}
//                                 href={item.link}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                                 className="relative text-neutral-600 dark:text-neutral-300"
//                             >
//                                 <span className="block">{item.name}</span>
//                             </a>
//                         ))}
//                         <div className="flex w-full flex-col gap-4">

//                             {session ? (
//                                 <NavbarButton href="/logout"
//                                     onClick={() => {
//                                         setIsMobileMenuOpen(false);
//                                         // logout(); 
//                                         handleLogout()
//                                     }}
//                                     variant="primary"
//                                     className="w-full "
//                                 >
//                                     Logout
//                                 </NavbarButton>
//                             ) : (
//                                 <>
//                                     <NavbarButton
//                                         onClick={() => setIsMobileMenuOpen(false)}
//                                         variant="primary"
//                                         className="w-full"
//                                     >
//                                         Login
//                                     </NavbarButton>
//                                     <NavbarButton
//                                         onClick={() => setIsMobileMenuOpen(false)}
//                                         variant="primary"
//                                         className="w-full"
//                                     >
//                                         Sign up
//                                     </NavbarButton>
//                                 </>
//                             )}



//                         </div>
//                     </MobileNavMenu>
//                 </MobileNav>
//             </Navbar>

//         </div>
//     );
// }


"use client";
import React from "react";
import { IconHome, IconMessage, IconWorldQuestion } from "@tabler/icons-react";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Header() {
    const { user, session, loading, hydrated } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
    ];

    if (user && session) {
        navItems.push(
            {
                name: "Questions",
                link: "/questions",
                icon: <IconWorldQuestion className="h-4 w-4 text-neutral-500 dark:text-white" />
            },
            {
                name: "Profile",
                link: `/users/${user.$id}/${slugify(user.name)}`,
                icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
            }
        );
    }

    function handleLogout() {
        toast.success("Logged out successfully!");
    }

    // Show loading state while hydrating or loading
    if (!hydrated || loading) {
        return (
            <div className="relative w-full top-5">
                <Navbar>
                    <NavBody>
                        <NavbarLogo />
                        <NavItems items={[]} />
                        <div className="flex items-center gap-4">
                            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 w-20 rounded"></div>
                            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-10 w-20 rounded"></div>
                        </div>
                    </NavBody>
                </Navbar>
            </div>
        );
    }

    return (
        <div className="relative w-full top-5">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {session ? (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <NavbarButton variant="primary">Logout</NavbarButton>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will end your current session and redirect you to the login page.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                        <Link href="/logout" onClick={handleLogout}>
                                            <AlertDialogAction className="cursor-pointer">Logout</AlertDialogAction>
                                        </Link>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ) : (
                            <>
                                <NavbarButton variant="primary" href="/login">Login</NavbarButton>
                                <NavbarButton variant="primary" href="/register">Sign up</NavbarButton>
                            </>
                        )}
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            {session ? (
                                <NavbarButton
                                    href="/logout"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        handleLogout()
                                    }}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Logout
                                </NavbarButton>
                            ) : (
                                <>
                                    <NavbarButton
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        variant="primary"
                                        className="w-full"
                                    >
                                        Login
                                    </NavbarButton>
                                    <NavbarButton
                                        href="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        variant="primary"
                                        className="w-full"
                                    >
                                        Sign up
                                    </NavbarButton>
                                </>
                            )}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}