"use client";
import { useState } from "react";

const tabs = [
  { id: "mortgage", label: "Mortgage" },
  { id: "rental", label: "Rental Cash Flow" },
  { id: "flip", label: "Flip / Rehab" },
  { id: "brrrr", label: "BRRRR" },
];

const Field = ({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) => {
  const [localValue, setLocalValue] = useState(value.toString());
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        value={localValue}
        onChange={e => {
          setLocalValue(e.target.value);
          const parsed = parseFloat(e.target.value);
          if (!isNaN(parsed)) onChange(parsed);
        }}
        onBlur={e => {
          const parsed = parseFloat(e.target.value);
          if (!isNaN(parsed)) {
            onChange(parsed);
            setLocalValue(parsed.toString());
          }
        }}
        className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 outline-none focus:border-stone-400"
      />
    </div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mt-5 mb-2">{children}</p>
);

const Result = ({ label, value, color = "" }: { label: string; value: string; color?: string }) => (
  <div className="flex justify-between items-baseline py-2 border-b border-white/10 last:border-0">
    <span className="text-sm text-white/60">{label}</span>
    <span className={`text-sm font-medium text-white ${color}`}>{value}</span>
  </div>
);

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("mortgage");

  function fmt(n: number) { return "$" + Math.round(n).toLocaleString(); }
  function pct(n: number) { return n.toFixed(1) + "%"; }

  const [mPrice, setMPrice] = useState(350000);
  const [mDown, setMDown] = useState(20);
  const [mRate, setMRate] = useState(7.25);
  const [mTerm, setMTerm] = useState(30);
  const [mTax, setMTax] = useState(4200);
  const [mIns, setMIns] = useState(1400);

  const mLoan = mPrice * (1 - mDown / 100);
  const mR = mRate / 100 / 12;
  const mN = mTerm * 12;
  const mPI = mR === 0 ? mLoan / mN : mLoan * (mR * Math.pow(1 + mR, mN)) / (Math.pow(1 + mR, mN) - 1);
  const mPITI = mPI + mTax / 12 + mIns / 12;
  const mTotalInt = mPI * mN - mLoan;

  const [rRent, setRRent] = useState(2200);
  const [rVac, setRVac] = useState(5);
  const [rMort, setRMort] = useState(1850);
  const [rMgmt, setRMgmt] = useState(8);
  const [rRepairs, setRRepairs] = useState(150);
  const [rOther, setROther] = useState(50);
  const [rCash, setRCash] = useState(90000);

  const rEGI = rRent * (1 - rVac / 100);
  const rMgmtAmt = rEGI * rMgmt / 100;
  const rTotalExp = rMort + rMgmtAmt + rRepairs + rOther;
  const rCF = rEGI - rTotalExp;
  const rCOC = (rCF * 12) / rCash * 100;
  const rNOI = (rEGI - (rMgmtAmt + rRepairs + rOther)) * 12;

  const [fPurchase, setFPurchase] = useState(180000);
  const [fBuycost, setFBuycost] = useState(3500);
  const [fRehab, setFRehab] = useState(45000);
  const [fCont, setFCont] = useState(10);
  const [fMonths, setFMonths] = useState(5);
  const [fHoldmo, setFHoldmo] = useState(1400);
  const [fARV, setFARV] = useState(310000);
  const [fSellPct, setFSellPct] = useState(7);

  const fTotalRehab = fRehab * (1 + fCont / 100);
  const fHoldTotal = fMonths * fHoldmo;
  const fSellCost = fARV * fSellPct / 100;
  const fAllIn = fPurchase + fBuycost + fTotalRehab + fHoldTotal + fSellCost;
  const fProfit = fARV - fAllIn;
  const fROI = fAllIn > 0 ? fProfit / (fPurchase + fBuycost + fTotalRehab) * 100 : 0;
  const fAROI = fMonths > 0 ? fROI / fMonths * 12 : 0;
  const fMAO = fARV * 0.7 - fTotalRehab;

  const [bPurchase, setBPurchase] = useState(120000);
  const [bRehab, setBRehab] = useState(35000);
  const [bOther, setBOther] = useState(5000);
  const [bARV, setBARV] = useState(225000);
  const [bLTV, setBLTV] = useState(75);
  const [bRate, setBRate] = useState(7.5);
  const [bRent, setBRent] = useState(1800);
  const [bExp, setBExp] = useState(400);

  const bTotalIn = bPurchase + bRehab + bOther;
  const bLoan = bARV * bLTV / 100;
  const bLeftIn = bTotalIn - bLoan;
  const bR = bRate / 100 / 12;
  const bN = 30 * 12;
  const bMort = bR === 0 ? bLoan / bN : bLoan * (bR * Math.pow(1 + bR, bN)) / (Math.pow(1 + bR, bN) - 1);
  const bCF = bRent - bExp - bMort;

  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      <nav className="flex items-center justify-between px-8 py-5 bg-[#f5f4f0] border-b border-stone-200">
        <a href="/" className="text-sm font-semibold tracking-widest uppercase text-stone-800">Residential REI</a>
        <div className="flex items-center gap-6">
          <a href="/tools" className="text-sm text-stone-900 font-medium">Free Tools</a>
          <a href="/directory" className="text-sm text-stone-500 hover:text-stone-800">Find a Pro</a>
          <a href="/signup" className="text-sm bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-700">Sign Up Free</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">Residential REI</p>
        <h1 className="text-3xl font-semibold text-stone-900 mb-2">Free Investor Tools</h1>
        <p className="text-stone-500 mb-8">Run the numbers before you run the deal.</p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white"
                  : "bg-white border border-stone-200 text-stone-500 hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-100">
            {activeTab === "mortgage" && (
              <>
                <Field label="Purchase Price" value={mPrice} onChange={setMPrice} />
                <Field label="Down Payment %" value={mDown} onChange={setMDown} step={0.5} />
                <Field label="Interest Rate %" value={mRate} onChange={setMRate} step={0.05} />
                <div className="mb-4">
                  <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">Loan Term</label>
                  <select value={mTerm} onChange={e => setMTerm(+e.target.value)} className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 outline-none">
                    <option value={30}>30 years</option>
                    <option value={20}>20 years</option>
                    <option value={15}>15 years</option>
                    <option value={10}>10 years</option>
                  </select>
                </div>
                <Field label="Property Tax / yr ($)" value={mTax} onChange={setMTax} />
                <Field label="Insurance / yr ($)" value={mIns} onChange={setMIns} />
              </>
            )}
            {activeTab === "rental" && (
              <>
                <SectionLabel>Income</SectionLabel>
                <Field label="Monthly Rent ($)" value={rRent} onChange={setRRent} />
                <Field label="Vacancy Rate %" value={rVac} onChange={setRVac} step={0.5} />
                <SectionLabel>Monthly Expenses</SectionLabel>
                <Field label="Mortgage / PITI ($)" value={rMort} onChange={setRMort} />
                <Field label="Property Management %" value={rMgmt} onChange={setRMgmt} step={0.5} />
                <Field label="Repairs + CapEx / mo ($)" value={rRepairs} onChange={setRRepairs} />
                <Field label="Other Expenses / mo ($)" value={rOther} onChange={setROther} />
                <SectionLabel>Purchase</SectionLabel>
                <Field label="Total Cash Invested ($)" value={rCash} onChange={setRCash} />
              </>
            )}
            {activeTab === "flip" && (
              <>
                <SectionLabel>Purchase</SectionLabel>
                <Field label="Purchase Price ($)" value={fPurchase} onChange={setFPurchase} />
                <Field label="Closing Costs — Buy ($)" value={fBuycost} onChange={setFBuycost} />
                <SectionLabel>Rehab</SectionLabel>
                <Field label="Rehab Budget ($)" value={fRehab} onChange={setFRehab} />
                <Field label="Contingency %" value={fCont} onChange={setFCont} step={0.5} />
                <SectionLabel>Holding</SectionLabel>
                <Field label="Hold Time (months)" value={fMonths} onChange={setFMonths} />
                <Field label="Monthly Hold Cost ($)" value={fHoldmo} onChange={setFHoldmo} />
                <SectionLabel>Sale</SectionLabel>
                <Field label="After Repair Value — ARV ($)" value={fARV} onChange={setFARV} />
                <Field label="Agent + Selling Costs %" value={fSellPct} onChange={setFSellPct} step={0.5} />
              </>
            )}
            {activeTab === "brrrr" && (
              <>
                <SectionLabel>Acquisition & Rehab</SectionLabel>
                <Field label="Purchase Price ($)" value={bPurchase} onChange={setBPurchase} />
                <Field label="Rehab Cost ($)" value={bRehab} onChange={setBRehab} />
                <Field label="Closing + Other Costs ($)" value={bOther} onChange={setBOther} />
                <SectionLabel>Refinance</SectionLabel>
                <Field label="After Repair Value — ARV ($)" value={bARV} onChange={setBARV} />
                <Field label="Refi LTV %" value={bLTV} onChange={setBLTV} step={0.5} />
                <Field label="New Interest Rate %" value={bRate} onChange={setBRate} step={0.05} />
                <SectionLabel>Rental</SectionLabel>
                <Field label="Monthly Rent ($)" value={bRent} onChange={setBRent} />
                <Field label="Monthly Expenses (excl. mortgage)" value={bExp} onChange={setBExp} />
              </>
            )}
          </div>

          <div className="bg-stone-900 rounded-2xl p-6 text-white">
            {activeTab === "mortgage" && (
              <>
                <div className="text-center pb-5 mb-5 border-b border-white/10">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Monthly Payment (PITI)</p>
                  <p className="text-4xl font-semibold">{fmt(mPITI)}</p>
                </div>
                <Result label="Loan amount" value={fmt(mLoan)} />
                <Result label="Principal & interest" value={fmt(mPI)} />
                <Result label="Property tax / mo" value={fmt(mTax / 12)} />
                <Result label="Insurance / mo" value={fmt(mIns / 12)} />
                <Result label="Total interest paid" value={fmt(mTotalInt)} />
              </>
            )}
            {activeTab === "rental" && (
              <>
                <div className="text-center pb-5 mb-5 border-b border-white/10">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Monthly Cash Flow</p>
                  <p className={`text-4xl font-semibold ${rCF >= 0 ? "text-green-400" : "text-red-400"}`}>{fmt(rCF)}</p>
                </div>
                <Result label="Effective gross income" value={fmt(rEGI)} />
                <Result label="Total expenses / mo" value={fmt(rTotalExp)} />
                <Result label="NOI (annual)" value={fmt(rNOI)} />
                <Result label="Cash-on-cash return" value={pct(rCOC)} color={rCOC >= 8 ? "text-green-400" : rCOC >= 5 ? "text-yellow-400" : "text-red-400"} />
                <Result label="Gross rent multiplier" value={(rCash / (rRent * 12)).toFixed(1) + "x"} />
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rCOC >= 10 ? "bg-green-400/20 text-green-400" : rCOC >= 6 ? "bg-yellow-400/20 text-yellow-400" : "bg-red-400/20 text-red-400"}`}>
                    {rCOC >= 10 ? "Strong deal" : rCOC >= 6 ? "Decent deal" : "Weak deal"}
                  </span>
                </div>
              </>
            )}
            {activeTab === "flip" && (
              <>
                <div className="text-center pb-5 mb-5 border-b border-white/10">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Estimated Profit</p>
                  <p className={`text-4xl font-semibold ${fProfit >= 0 ? "text-green-400" : "text-red-400"}`}>{fmt(fProfit)}</p>
                </div>
                <Result label="Total rehab (w/ contingency)" value={fmt(fTotalRehab)} />
                <Result label="Holding costs" value={fmt(fHoldTotal)} />
                <Result label="Selling costs" value={fmt(fSellCost)} />
                <Result label="Total all-in cost" value={fmt(fAllIn)} />
                <Result label="ROI" value={pct(fROI)} />
                <Result label="Annualized ROI" value={pct(fAROI)} />
                <Result label="Max allowable offer" value={fmt(fMAO)} />
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${fPurchase <= fMAO ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"}`}>
                    70% rule: {fPurchase <= fMAO ? "Passes ✓" : "Fails ✗"}
                  </span>
                </div>
              </>
            )}
            {activeTab === "brrrr" && (
              <>
                <div className="text-center pb-5 mb-5 border-b border-white/10">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Cash Left In Deal</p>
                  <p className="text-4xl font-semibold">{bLeftIn <= 0 ? "$0" : fmt(bLeftIn)}</p>
                </div>
                <Result label="Total invested" value={fmt(bTotalIn)} />
                <Result label="Refi loan amount" value={fmt(bLoan)} />
                <Result label="Cash pulled out" value={fmt(bLoan)} />
                <Result label="New mortgage / mo" value={fmt(bMort)} />
                <Result label="Monthly cash flow" value={fmt(bCF)} color={bCF >= 200 ? "text-green-400" : bCF >= 0 ? "text-yellow-400" : "text-red-400"} />
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${bLeftIn <= 0 ? "bg-green-400/20 text-green-400" : "bg-yellow-400/20 text-yellow-400"}`}>
                    {bLeftIn <= 0 ? "Infinite returns — all cash out!" : "Cash still in deal"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}