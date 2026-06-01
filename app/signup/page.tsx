"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignup() {
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email to confirm your account!");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f4f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-xs font-semibold tracking-widest uppercase text-stone-400">Residential REI</a>
          <h1 className="text-2xl font-semibold text-stone-900 mt-2">Create your account</h1>
          <p className="text-sm text-stone-500 mt-1">Free to join. No credit card required.</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-8">
          {message && (
            <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="mb-5">
            <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Dustin Fronk"
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 outline-none focus:border-stone-400"
            />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 outline-none focus:border-stone-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 outline-none focus:border-stone-400"
            />
          </div>
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-stone-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-xs text-stone-400 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-stone-600 underline underline-offset-2">Log in</a>
          </p>
        </div>
      </div>
    </main>
  );
}