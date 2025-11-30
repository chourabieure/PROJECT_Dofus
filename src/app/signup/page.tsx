"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/app/auth/actions";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const result = await signUp(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pattern flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-amber-600 tracking-wide">
              Dofus Market Analyzer
            </h1>
          </Link>
          <p className="text-(--text-muted) mt-2">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-8 shadow-xl">
          {error && (
            <div className="mb-6 p-4 bg-(--accent-ruby)/10 border border-(--accent-ruby)/30 rounded-lg text-(--accent-ruby) text-sm text-center">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-(--foreground) mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-(--input-bg) border border-(--card-border) rounded-lg text-(--foreground) placeholder-(--text-muted) focus:outline-none focus:border-(--accent-gold) focus:ring-1 focus:ring-(--accent-gold) transition-colors"
                placeholder="adventurer@dofus.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-(--foreground) mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-(--input-bg) border border-(--card-border) rounded-lg text-(--foreground) placeholder-(--text-muted) focus:outline-none focus:border-(--accent-gold) focus:ring-1 focus:ring-(--accent-gold) transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-(--foreground) mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-(--input-bg) border border-(--card-border) rounded-lg text-(--foreground) placeholder-(--text-muted) focus:outline-none focus:border-(--accent-gold) focus:ring-1 focus:ring-(--accent-gold) transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-linear-to-r from-(--accent-copper) to-(--accent-gold) text-(--background) font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--accent-gold) focus:ring-offset-2 focus:ring-offset-(--card-bg) transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-(--text-muted) text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-(--accent-gold) hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-(--text-muted) text-sm hover:text-(--foreground) transition-colors"
          >
            ← Back to Market Analyzer
          </Link>
        </div>
      </div>
    </div>
  );
}
