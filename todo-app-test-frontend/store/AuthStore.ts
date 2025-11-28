"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isAuth: boolean;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      setToken: (token) =>
        set({
          accessToken: token,
          isAuth: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          isAuth: false,
        }),
      isAuth: false,
    }),
    { name: "auth-store" }
  )
);
