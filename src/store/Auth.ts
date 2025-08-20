
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { account } from '@/models/client/config';
import { AppwriteException, Models } from 'appwrite';

export interface UserPrefs {
    email: ReactNode;
    $createdAt: string | number | Date;
    $updatedAt: string | number | Date;
    name(name: any, arg1: number, arg2: number): string | Blob | undefined;
    reputation: number;
}

interface AuthState {
    session: Models.Session | null;
    user: Models.User<UserPrefs> | null;
    hydrated: boolean;
    loading: boolean;

    // Actions
    verifySession: () => Promise<void>;
    login: (email: string, password: string) => Promise<{ error?: AppwriteException }>;
    logout: () => Promise<void>;
    createAccount: (name: string, email: string, password: string) => Promise<{ error?: AppwriteException }>;

    // Internal actions
    setHydrated: (hydrated: boolean) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                session: null,
                user: null,
                hydrated: false,
                loading: false,

                setHydrated: (hydrated: boolean) => set({ hydrated }),
                setLoading: (loading: boolean) => set({ loading }),

                verifySession: async () => {
                    try {
                        set({ loading: true });

                        const session = await account.getSession('current');
                        const user = await account.get<UserPrefs>();

                        set({
                            session,
                            user,
                            loading: false,
                        });
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (error) {
                        console.log('No active session');
                        set({
                            session: null,
                            user: null,
                            loading: false,
                        });
                    }
                },

                login: async (email: string, password: string) => {
                    try {
                        set({ loading: true });

                        const session = await account.createEmailPasswordSession(email, password);
                        const user = await account.get<UserPrefs>();

                        set({
                            session,
                            user,
                            loading: false,
                        });

                        return {};
                    } catch (error) {
                        set({ loading: false });
                        return { error: error as AppwriteException };
                    }
                },

                logout: async () => {
                    try {
                        set({ loading: true });

                        await account.deleteSession('current');

                        set({
                            session: null,
                            user: null,
                            loading: false,
                        });

                        // Force redirect after logout
                        if (typeof window !== 'undefined') {
                            window.location.href = '/';
                        }
                    } catch (error) {
                        console.error('Logout error:', error);
                        // Clear state anyway
                        set({
                            session: null,
                            user: null,
                            loading: false,
                        });

                        if (typeof window !== 'undefined') {
                            window.location.href = '/';
                        }
                    }
                },

                createAccount: async (name: string, email: string, password: string) => {
                    try {
                        set({ loading: true });

                        await account.create('unique()', email, password, name);

                        set({ loading: false });
                        return {};
                    } catch (error) {
                        set({ loading: false });
                        return { error: error as AppwriteException };
                    }
                },
            }),
            {
                name: 'auth-storage',
                partialize: (state) => ({
                    // Only persist session and user, not loading states
                    session: state.session,
                    user: state.user,
                }),
                onRehydrateStorage: () => (state) => {
                    // Mark as hydrated when rehydration is complete
                    state?.setHydrated(true);
                },
            }
        ),
        {
            name: 'auth-store',
        }
    )
);