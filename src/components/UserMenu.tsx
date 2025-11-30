"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import type { User } from "@supabase/supabase-js";

interface UserMenuProps {
  user: User | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/signin"
          className="text-sm text-(--text-muted) hover:text-(--foreground) transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="text-sm px-4 py-2 bg-linear-to-r from-(--accent-copper) to-(--accent-gold) text-(--background) font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-(--card-border)/30 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-(--accent-copper) to-(--accent-gold) flex items-center justify-center text-(--background) font-semibold text-sm">
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-(--foreground) hidden sm:block max-w-32 truncate">
          {user.email}
        </span>
        <svg
          className={`w-4 h-4 text-(--text-muted) transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-(--card-bg) border border-(--card-border) rounded-lg shadow-xl z-50 py-1 animate-fade-in">
            <div className="px-4 py-2 border-b border-(--card-border)">
              <p className="text-xs text-(--text-muted)">Signed in as</p>
              <p className="text-sm text-(--foreground) truncate">
                {user.email}
              </p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="w-full text-left px-4 py-2 text-sm text-(--accent-ruby) hover:bg-(--card-border)/30 transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
