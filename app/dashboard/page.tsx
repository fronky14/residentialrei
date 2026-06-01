"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) return (
    <main className="min-h-screen bg-[#f5f4f0] flex items-center justify-center">
      <p className="text-stone-400 text-sm">Loading...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      <nav className="flex items-center justify-between px-8 py-5 bg-[#f5f4f0] border-b border-stone-200">
        <a href="/" className="text-sm font-semibold tracking-widest uppercase text-stone-800">Residential REI</a>
        <div className="flex items-center gap-6">
          <a href="/tools" className="text-sm text-stone-500 hover:text-stone-800">Free Tools</a>
          <button onClick={handleLogout} className="text-sm text-stone-500 hover:text-stone-800">Log Out</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">Welcome back</p>
        <h1 className="text-3xl font-semibold text-stone-900 mb-8">
          {user?.user_metadata?.full_name ? user.user_metadata.full_name.split(" ")[0] + "'s Dashboard" : "Your Dashboard"}
        </h1>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-stone-100">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400 mb-1">Properties</p>
            <p className="text-3xl font-semibold text-stone-900">0</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-stone-100">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400 mb-1">Saved Calculations</p>
            <p className="text-3xl font-semibold text-stone-900">0</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-stone-100">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400 mb-1">Documents</p>
            <p className="text-3xl font-semibold text-stone-900">0</p>
          </div>
        </div>

        {/* Quick actions */}
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">Quick Actions</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <a href="/tools" className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-stone-300 transition-colors">
            <div className="text-2xl mb-3">🧮</div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1">Run a Calculation</h3>
            <p className="text-xs text-stone-400">Mortgage, rental, flip, BRRRR</p>
          </a>
          <a href="/properties/new" className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-stone-300 transition-colors">
            <div className="text-2xl mb-3">🏘️</div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1">Add a Property</h3>
            <p className="text-xs text-stone-400">Track a deal or rental property</p>
          </a>
          <a href="/directory" className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-stone-300 transition-colors">
            <div className="text-2xl mb-3">🤝</div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1">Find a Pro</h3>
            <p className="text-xs text-stone-400">Lenders, agents, contractors</p>
          </a>
        </div>

        {/* Properties list placeholder */}
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">Your Properties</p>
        <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center">
          <p className="text-stone-400 text-sm mb-4">No properties yet</p>
          <a href="/properties/new" className="text-sm bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-700">
            Add your first property
          </a>
        </div>
      </div>
    </main>
  );
}