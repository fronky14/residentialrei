export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 bg-[#f5f4f0] border-b border-stone-200">
        <span className="text-sm font-semibold tracking-widest uppercase text-stone-800">Residential REI</span>
        <div className="flex items-center gap-6">
          <a href="/tools" className="text-sm text-stone-500 hover:text-stone-800">Free Tools</a>
          <a href="/directory" className="text-sm text-stone-500 hover:text-stone-800">Find a Pro</a>
          <a href="/signup" className="text-sm bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-700">Sign Up Free</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">Built for residential investors</p>
        <h1 className="text-5xl font-semibold text-stone-900 leading-tight mb-6">
          Run the numbers.<br />Build your portfolio.
        </h1>
        <p className="text-lg text-stone-500 max-w-xl mx-auto mb-10">
          Free tools, deal analysis, and portfolio management built specifically for residential real estate investors.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="/signup" className="bg-stone-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-stone-700">Get Started Free</a>
          <a href="/tools" className="text-sm text-stone-600 underline underline-offset-4">Try the free tools</a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-8 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-8 border border-stone-100">
          <div className="text-2xl mb-4">🧮</div>
          <h3 className="text-base font-semibold text-stone-900 mb-2">Free Calculators</h3>
          <p className="text-sm text-stone-500 leading-relaxed">Mortgage, rental cash flow, flip/rehab, and BRRRR calculators — all free, no login needed.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-stone-100">
          <div className="text-2xl mb-4">🏘️</div>
          <h3 className="text-base font-semibold text-stone-900 mb-2">Portfolio Dashboard</h3>
          <p className="text-sm text-stone-500 leading-relaxed">Save deals, track properties, store documents and photos — everything in one place.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-stone-100">
          <div className="text-2xl mb-4">🤝</div>
          <h3 className="text-base font-semibold text-stone-900 mb-2">Find Professionals</h3>
          <p className="text-sm text-stone-500 leading-relaxed">Connect with vetted lenders, agents, contractors, and property managers in your market.</p>
        </div>
      </section>
    </main>
  );
}