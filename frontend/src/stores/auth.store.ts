import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    fullName: string;
    name?: string;
    role: string;
    institute?: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: { name: string; email: string; password: string; institute?: string }) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (email: string, password: string) => {
                set({ isLoading: true });
                try {
                    const res = await fetch(`${API_URL}/auth/signin`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });
                    const contentType = res.headers.get('content-type');
                    if (!contentType || !contentType.includes('application/json')) {
                        throw new Error('Server error. Please try again later.');
                    }
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || data.message || 'Login failed');
                    // Backend nests under data: { token, user }
                    const userData = data.data || data;
                    const user = userData.user;
                    // Normalize user object
                    if (user && !user.name) user.name = user.fullName || user.full_name || 'Student';
                    set({ user, token: userData.token, isAuthenticated: true, isLoading: false });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            signup: async (formData) => {
                set({ isLoading: true });
                try {
                    const res = await fetch(`${API_URL}/auth/signup`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        // Send what backend expects: fullName, email, password, confirmPassword
                        body: JSON.stringify({
                            fullName: formData.name,
                            email: formData.email,
                            password: formData.password,
                            confirmPassword: formData.password,
                        }),
                    });
                    const contentType = res.headers.get('content-type');
                    if (!contentType || !contentType.includes('application/json')) {
                        throw new Error('Server error. Please try again later.');
                    }
                    const data = await res.json();
                    if (!res.ok) {
                        // Backend may return details array for validation errors
                        const errorMsg = data.details
                            ? data.details.map((d: any) => d.message).join('. ')
                            : data.error || data.message || 'Signup failed';
                        throw new Error(errorMsg);
                    }
                    // Backend nests under data: { token, user }
                    const userData = data.data || data;
                    const user = userData.user;
                    if (user && !user.name) user.name = user.fullName || user.full_name || 'Student';
                    set({ user, token: userData.token, isAuthenticated: true, isLoading: false });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },

            setUser: (user: User) => {
                set({ user });
            },
        }),
        {
            name: 'saarthi-auth',
            partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
        }
    )
);
