// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";
// import { persist } from "zustand/middleware";
// import { AppwriteException, ID, Models } from "appwrite";
// import { account } from "@/models/client/config";

// export interface UserPrefs {
//     reputation: number;
// }

// interface IAuthStore {
//     session: Models.Session | null;
//     user: Models.User<UserPrefs> | null;
//     jwt: string | null;
//     hydrated: boolean;

//     setHydrated(): void;
//     verifySession(): Promise<void>;
//     login(
//         email: string,
//         password: string
//     ): Promise<{
//         success: boolean;
//         error?: AppwriteException | null
//     }>

//     createAccount(
//         name: string,
//         email: string,
//         password: string
//     ): Promise<{
//         success: boolean;
//         error?: AppwriteException | null
//     }>

//     logout(): Promise<void>

// }

// export const useAuthStore = create<IAuthStore>()(
//     persist(
//         immer((set) => ({
//             session: null,
//             user: null,
//             jwt: null,
//             hydrated: false,

//             setHydrated() {
//                 set({ hydrated: true })
//             },

//             async verifySession() {
//                 try {
//                     const session = await account.getSession("current")
//                     set({ session })

//                 } catch (error) {
//                     console.error(error);

//                 }

//             },

//             async login(email: string, password: string) {
//                 try {
//                     const session = await account.createEmailPasswordSession(email, password)
//                     const [user, { jwt }] = await Promise.all([
//                         account.get<UserPrefs>(),
//                         account.createJWT()
//                     ])
//                     if (!user.prefs?.reputation) await account.updatePrefs<UserPrefs>({
//                         reputation: 0
//                     })
//                     set({ session, user, jwt })
//                     return { success: true }
//                 } catch (error) {
//                     console.error(error);
//                     return {
//                         success: false,
//                         error: error instanceof AppwriteException ? error : null
//                     }
//                 }
//             },

//             async createAccount(name: string, email: string, password: string) {
//                 try {
//                     await account.create(ID.unique(), email, password, name)
//                     return { success: true }

//                 } catch (error) {
//                     console.error(error);
//                     return {
//                         success: false,
//                         error: error instanceof AppwriteException ? error : null
//                     }
//                 }
//             },

//             async logout() {
//                 try {
//                     await account.deleteSessions()
//                     set({ session: null, user: null, jwt: null })

//                 } catch (error) {
//                     console.error(error);

//                 }

//             },

//         })),

//         {
//             name: "auth",
//             onRehydrateStorage() {
//                 return (state, error) => {
//                     if (!error) state?.setHydrated()

//                 }
//             }
//         }

//     )

// )

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
    reputation: number;
}

interface IAuthStore {
    session: Models.Session | null;
    user: Models.User<UserPrefs> | null;
    jwt: string | null;
    hydrated: boolean;
    loading: boolean;
    initialized: boolean;

    setHydrated(): void;
    initializeAuth(): Promise<void>;
    verifySession(): Promise<void>;
    login(
        email: string,
        password: string
    ): Promise<{
        success: boolean;
        error?: AppwriteException | null
    }>

    createAccount(
        name: string,
        email: string,
        password: string
    ): Promise<{
        success: boolean;
        error?: AppwriteException | null
    }>

    logout(): Promise<void>
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set, get) => ({
            session: null,
            user: null,
            jwt: null,
            hydrated: false,
            loading: false,
            initialized: false,

            setHydrated() {
                set({ hydrated: true });
            },

            async initializeAuth() {
                const state = get();
                if (state.initialized || state.loading) return;
                
                set({ loading: true });
                
                try {
                    // Try to get current session
                    const session = await account.getSession("current");
                    
                    if (session) {
                        // Get user and JWT if session exists
                        const [user, { jwt }] = await Promise.all([
                            account.get<UserPrefs>(),
                            account.createJWT()
                        ]);

                        // Initialize reputation if needed
                        if (user.prefs?.reputation === undefined) {
                            const updatedUser = await account.updatePrefs<UserPrefs>({
                                reputation: 0
                            });
                            user.prefs = updatedUser.prefs;
                        }

                        set({ 
                            session, 
                            user, 
                            jwt, 
                            initialized: true 
                        });
                    } else {
                        // No session found
                        set({ 
                            session: null, 
                            user: null, 
                            jwt: null, 
                            initialized: true 
                        });
                    }
                } catch (error) {
                    // Error getting session (likely no session or expired)
                    console.log("No active session found");
                    set({ 
                        session: null, 
                        user: null, 
                        jwt: null, 
                        initialized: true 
                    });
                } finally {
                    set({ loading: false });
                }
            },

            async verifySession() {
                // Only verify if we have a session stored
                const currentSession = get().session;
                if (!currentSession) return;

                try {
                    const session = await account.getSession("current");
                    if (!session) {
                        // Session expired or invalid
                        set({ session: null, user: null, jwt: null });
                    }
                } catch (error) {
                    // Session is invalid
                    console.log("Session verification failed, clearing auth state");
                    set({ session: null, user: null, jwt: null });
                }
            },

            async login(email: string, password: string) {
                set({ loading: true });
                
                try {
                    const session = await account.createEmailPasswordSession(email, password);
                    const [user, { jwt }] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT()
                    ]);
                    
                    if (user.prefs?.reputation === undefined) {
                        const updatedUser = await account.updatePrefs<UserPrefs>({
                            reputation: 0
                        });
                        user.prefs = updatedUser.prefs;
                    }
                    
                    set({ session, user, jwt, initialized: true });
                    return { success: true };
                } catch (error) {
                    console.error("Login failed:", error);
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error : null
                    };
                } finally {
                    set({ loading: false });
                }
            },

            async createAccount(name: string, email: string, password: string) {
                set({ loading: true });
                
                try {
                    await account.create(ID.unique(), email, password, name);
                    return { success: true };
                } catch (error) {
                    console.error("Account creation failed:", error);
                    return {
                        success: false,
                        error: error instanceof AppwriteException ? error : null
                    };
                } finally {
                    set({ loading: false });
                }
            },

            async logout() {
                set({ loading: true });
                
                try {
                    await account.deleteSessions();
                } catch (error) {
                    console.error("Logout failed:", error);
                    // Continue with local cleanup even if server logout fails
                } finally {
                    set({ 
                        session: null, 
                        user: null, 
                        jwt: null, 
                        loading: false 
                    });
                }
            },
        })),

        {
            name: "auth",
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error && state) {
                        state.setHydrated();
                        // Initialize auth after rehydration
                        setTimeout(() => state.initializeAuth(), 0);
                    }
                }
            }
        }
    )
)