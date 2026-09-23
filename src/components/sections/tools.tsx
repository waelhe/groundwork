"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Calculator, Percent, Plus, Scale, Trash2, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/shared";
import { cn } from "@/lib/utils";

const money = (v: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(v);

const num = (v: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(v);

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </Label>
      <div className="relative mt-1.5">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
          className={cn(
            "border-slate-300 text-[15px] font-semibold text-navy-950 focus-visible:ring-electric-500",
            prefix && "pl-7",
            suffix && "pr-12"
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-electric-600/20 bg-electric-50 p-4">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" />
      <p className="text-[13px] leading-relaxed text-slate-700">{children}</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone = "navy",
  sub,
}: {
  label: string;
  value: string;
  tone?: "navy" | "green" | "amber" | "red";
  sub?: string;
}) {
  const tones = {
    navy: "text-navy-950",
    green: "text-signal-green-deep",
    amber: "text-signal-amber-deep",
    red: "text-red-600",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
      <div className={cn("mt-1 font-display text-2xl font-bold", tones[tone])}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

/* ---------------- Break-even analyzer ---------------- */

function BreakEvenTool() {
  const [price, setPrice] = useState(38);
  const [unitCost, setUnitCost] = useState(21);
  const [fixed, setFixed] = useState(9500);
  const [volume, setVolume] = useState(620);

  const cm = price - unitCost;
  const cmRatio = price > 0 ? cm / price : 0;
  const beUnits = cm > 0 ? fixed / cm : Infinity;
  const beRevenue = cm > 0 ? fixed / cmRatio : Infinity;
  const monthlyProfit = cm * volume - fixed;
  const marginOfSafety = volume > 0 && beUnits !== Infinity ? (volume - beUnits) / volume : 0;

  const chartData = useMemo(() => {
    if (cm <= 0) return [];
    const maxUnits = Math.max(beUnits * 1.9, volume * 1.35, 10);
    const stepCount = 14;
    const step = maxUnits / stepCount;
    return Array.from({ length: stepCount + 1 }, (_, i) => {
      const units = Math.round(step * i);
      return {
        units,
        revenue: Math.round(price * units),
        cost: Math.round(fixed + unitCost * units),
        fixed: fixed,
      };
    });
  }, [price, unitCost, fixed, volume, cm, beUnits]);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <NumberField id="be-price" label="Average price per sale" value={price} onChange={setPrice} prefix="$" step={0.5} />
        <NumberField id="be-vcost" label="Variable cost per sale" value={unitCost} onChange={setUnitCost} prefix="$" step={0.5} />
        <NumberField id="be-fixed" label="Monthly fixed costs" value={fixed} onChange={setFixed} prefix="$" step={100} />
        <NumberField id="be-vol" label="Current monthly volume" value={volume} onChange={setVolume} suffix="units" step={10} />
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs leading-relaxed text-slate-600">
          <span className="font-semibold text-navy-950">Variable cost</span> = anything that changes per sale:
          materials, delivery fees, payment processing, commissions.
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="Contribution / sale" value={money(cm, 2)} tone={cm > 0 ? "navy" : "red"} />
          <MetricCard label="Margin ratio" value={`${num(cmRatio * 100, 1)}%`} tone={cmRatio >= 0.3 ? "green" : cmRatio > 0.15 ? "amber" : "red"} />
          <MetricCard label="Break-even" value={beUnits === Infinity ? "—" : `${num(Math.ceil(beUnits))} sales`} tone="navy" sub={beUnits === Infinity ? "price below cost" : money(beRevenue) + " / month"} />
          <MetricCard
            label="Monthly profit"
            value={money(monthlyProfit)}
            tone={monthlyProfit >= 0 ? "green" : "red"}
            sub={`safety margin ${num(marginOfSafety * 100, 0)}%`}
          />
        </div>

        <div className="h-[300px] rounded-2xl border border-slate-200 bg-white p-4">
          {cm > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
                <defs>
                  <linearGradient id="profitZone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0e9f6e" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#0e9f6e" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="units" tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(v) => num(v)} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : num(v))}
                  width={44}
                />
                <Tooltip
                  formatter={(value: number | string, name: string) => [money(Number(value)), name === "revenue" ? "Revenue" : name === "cost" ? "Total cost" : "Fixed costs"]}
                  labelFormatter={(l) => `${num(Number(l))} units sold`}
                  contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <ReferenceLine x={Math.ceil(beUnits)} stroke="#2e7cff" strokeDasharray="5 4" label={{ value: "Break-even", fontSize: 11, fill: "#1b66e0", position: "insideTopRight" }} />
                <Area type="monotone" dataKey="revenue" stroke="none" fill="url(#profitZone)" />
                <Line type="monotone" dataKey="revenue" stroke="#2e7cff" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="cost" stroke="#b97a10" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="fixed" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <span className="font-display text-lg font-bold text-red-600">Price is below variable cost</span>
              <p className="max-w-sm text-sm text-slate-500">
                Every sale loses {money(Math.abs(cm), 2)} before fixed costs. This is a pricing emergency — selling
                more makes it worse.
              </p>
            </div>
          )}
        </div>

        <Insight>
          <span className="font-semibold text-navy-950">How to read this:</span> the blue line is revenue, the amber
          line is total cost. Where they cross is break-even. A margin ratio under 25% means pricing or variable
          costs deserve attention <em>before</em> anything else — including marketing.
        </Insight>
      </div>
    </div>
  );
}

/* ---------------- Pricing & margin tool ---------------- */

function PricingTool() {
  const [price, setPrice] = useState(45);
  const [unitCost, setUnitCost] = useState(24);
  const [volume, setVolume] = useState(400);
  const [change, setChange] = useState(10);

  const newPrice = price * (1 + change / 100);
  const marginNow = price - unitCost;
  const marginNew = newPrice - unitCost;
  const profitNow = marginNow * volume;
  // Note: linear model — assumes volume unchanged (see caveat)
  const profitNew = marginNew * volume;
  const delta = profitNew - profitNow;
  const beNow = marginNow > 0 ? profitNow / marginNow : 0;

  const chartData = useMemo(() => {
    const points = Array.from({ length: 25 }, (_, i) => {
      const chg = -30 + i * 2.5;
      const p = price * (1 + chg / 100);
      return {
        change: chg,
        profit: Math.round((p - unitCost) * volume),
        zero: 0,
      };
    });
    return points;
  }, [price, unitCost, volume]);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <NumberField id="pr-price" label="Current price" value={price} onChange={setPrice} prefix="$" step={0.5} />
        <NumberField id="pr-cost" label="Cost per sale (materials + labor)" value={unitCost} onChange={setUnitCost} prefix="$" step={0.5} />
        <NumberField id="pr-vol" label="Monthly volume" value={volume} onChange={setVolume} suffix="units" step={10} />
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-baseline justify-between">
            <Label className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Price change
            </Label>
            <span
              className={cn(
                "font-display text-lg font-bold",
                change >= 0 ? "text-signal-green-deep" : "text-red-600"
              )}
            >
              {change > 0 ? "+" : ""}
              {num(change, 1)}%
            </span>
          </div>
          <input
            type="range"
            min={-30}
            max={30}
            step={1}
            value={change}
            onChange={(e) => setChange(parseInt(e.target.value))}
            className="mt-3 w-full accent-electric-600"
            aria-label="Price change percentage"
          />
          <div className="mt-1 flex justify-between text-[11px] text-slate-400">
            <span>−30%</span>
            <span>0</span>
            <span>+30%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="New price" value={money(newPrice, 2)} />
          <MetricCard
            label="Margin per sale"
            value={money(marginNew, 2)}
            sub={`was ${money(marginNow, 2)}`}
            tone={marginNew > marginNow ? "green" : marginNew < marginNow ? "red" : "navy"}
          />
          <MetricCard
            label="Margin %"
            value={newPrice > 0 ? `${num((marginNew / newPrice) * 100, 1)}%` : "—"}
            sub={`was ${price > 0 ? num((marginNow / price) * 100, 1) + "%" : "—"}`}
            tone={marginNew / newPrice >= 0.35 ? "green" : marginNew / newPrice >= 0.2 ? "amber" : "red"}
          />
          <MetricCard
            label="Monthly gross profit"
            value={money(profitNew)}
            sub={`${delta >= 0 ? "+" : ""}${money(delta)} vs today`}
            tone={delta >= 0 ? "green" : "red"}
          />
        </div>

        <div className="h-[300px] rounded-2xl border border-slate-200 bg-white p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
              <defs>
                <linearGradient id="priceZone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2e7cff" stopOpacity={0.16} />
                  <stop offset="95%" stopColor="#2e7cff" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="change"
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(v) => (Math.abs(v) >= 1000 ? `${Math.round(v / 1000)}k` : num(v))}
                width={48}
              />
              <Tooltip
                formatter={(value: number | string) => [money(Number(value)), "Monthly gross profit"]}
                labelFormatter={(l) => `Price ${Number(l) > 0 ? "+" : ""}${l}% (${money(price * (1 + Number(l) / 100), 2)})`}
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
              />
              <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
              <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="4 4" />
              <ReferenceLine x={change} stroke="#1b66e0" strokeWidth={1.5} label={{ value: "You", fontSize: 11, fill: "#1b66e0", position: "insideTopLeft" }} />
              <Area type="monotone" dataKey="profit" stroke="none" fill="url(#priceZone)" />
              <Line type="monotone" dataKey="profit" stroke="#2e7cff" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Insight>
          <span className="font-semibold text-navy-950">Honest caveat:</span> this model holds volume constant — real
          customers may buy less as prices rise. Use it to find your floor (the price where margin dies), then test a
          small rise (5-10%) on a few items first. The margin math tells you what a price change <em>could</em> win;
          only a real test tells you what it <em>will</em> win.
        </Insight>
      </div>
    </div>
  );
}

/* ---------------- Cost structure tool ---------------- */

interface CostLine {
  id: number;
  name: string;
  amount: number;
  type: "fixed" | "variable";
}

const defaultCosts: CostLine[] = [
  { id: 1, name: "Rent & utilities", amount: 3200, type: "fixed" },
  { id: 2, name: "Wages (base)", amount: 8500, type: "fixed" },
  { id: 3, name: "Materials / stock", amount: 6400, type: "variable" },
  { id: 4, name: "Software & subscriptions", amount: 380, type: "fixed" },
  { id: 5, name: "Delivery & fuel", amount: 900, type: "variable" },
  { id: 6, name: "Marketing", amount: 600, type: "fixed" },
];

const PIE_COLORS = ["#2e7cff", "#5c9dff", "#2dd4bf", "#0e9f6e", "#f6a723", "#b97a10", "#94a3b8", "#475569"];

function CostStructureTool() {
  const [revenue, setRevenue] = useState(26000);
  const [costs, setCosts] = useState<CostLine[]>(defaultCosts);

  const totals = useMemo(() => {
    const fixed = costs.filter((c) => c.type === "fixed").reduce((s, c) => s + c.amount, 0);
    const variable = costs.filter((c) => c.type === "variable").reduce((s, c) => s + c.amount, 0);
    const total = fixed + variable;
    return { fixed, variable, total, profit: revenue - total };
  }, [costs, revenue]);

  const sorted = useMemo(() => [...costs].sort((a, b) => b.amount - a.amount), [costs]);
  const topShare = totals.total > 0 ? (sorted[0]?.amount ?? 0) / totals.total : 0;

  const update = (id: number, patch: Partial<CostLine>) =>
    setCosts((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const remove = (id: number) => setCosts((cs) => cs.filter((c) => c.id !== id));
  const add = () =>
    setCosts((cs) => [...cs, { id: Date.now(), name: "", amount: 0, type: "fixed" }]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
          <NumberField id="cs-rev" label="Monthly revenue" value={revenue} onChange={setRevenue} prefix="$" step={500} />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
            <span className="font-display text-sm font-bold text-navy-950">Cost lines</span>
            <Button
              size="sm"
              variant="outline"
              onClick={add}
              className="h-8 border-electric-600/40 text-electric-700 hover:bg-electric-50"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Add line
            </Button>
          </div>
          <div className="max-h-[360px] overflow-y-auto scrollbar-thin">
            {sorted.map((c) => (
              <div key={c.id} className="flex items-center gap-2 border-b border-slate-50 px-5 py-2.5 last:border-0">
                <Input
                  value={c.name}
                  onChange={(e) => update(c.id, { name: e.target.value })}
                  placeholder="Cost name"
                  className="h-9 flex-1 border-transparent bg-transparent px-2 text-sm font-medium shadow-none hover:border-slate-200 focus-visible:border-electric-500"
                />
                <Input
                  type="number"
                  value={c.amount || ""}
                  onChange={(e) => update(c.id, { amount: parseFloat(e.target.value) || 0 })}
                  className="h-9 w-28 border-transparent bg-slate-50 px-2 text-right text-sm font-semibold text-navy-950 shadow-none hover:border-slate-200 focus-visible:border-electric-500"
                  aria-label={`${c.name || "cost"} amount`}
                />
                <div className="flex overflow-hidden rounded-md border border-slate-200">
                  {(["fixed", "variable"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update(c.id, { type: t })}
                      className={cn(
                        "px-2 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors",
                        c.type === t
                          ? t === "fixed"
                            ? "bg-navy-950 text-white"
                            : "bg-electric-600 text-white"
                          : "bg-white text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {t === "fixed" ? "Fix" : "Var"}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => remove(c.id)}
                  className="rounded-md p-1.5 text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove ${c.name || "cost line"}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="Fixed costs" value={money(totals.fixed)} sub={`${num(revenue > 0 ? (totals.fixed / revenue) * 100 : 0, 0)}% of revenue`} />
          <MetricCard label="Variable costs" value={money(totals.variable)} sub={`${num(revenue > 0 ? (totals.variable / revenue) * 100 : 0, 0)}% of revenue`} />
          <MetricCard label="Total costs" value={money(totals.total)} tone="amber" sub={`${num(revenue > 0 ? (totals.total / revenue) * 100 : 0, 0)}% of revenue`} />
          <MetricCard
            label="Monthly profit"
            value={money(totals.profit)}
            tone={totals.profit >= 0 ? "green" : "red"}
            sub={`margin ${num(revenue > 0 ? (totals.profit / revenue) * 100 : 0, 1)}%`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-[280px] rounded-2xl border border-slate-200 bg-white p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sorted.filter((c) => c.amount > 0)}
                dataKey="amount"
                nameKey="name"
                innerRadius="52%"
                outerRadius="80%"
                paddingAngle={2}
                strokeWidth={0}
              >
                {sorted.filter((c) => c.amount > 0).map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | string, name: string) => [money(Number(value)), name || "Unnamed"]}
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <Insight>
          <span className="font-semibold text-navy-950">What to look for:</span> your largest line is{" "}
          <span className="font-semibold text-navy-950">
            {sorted[0]?.name || "—"}
            {topShare > 0 ? ` (${num(topShare * 100, 0)}% of total costs)` : ""}
          </span>
          . Fixed costs above ~70% of revenue make a business fragile — every slow month hurts directly. And if you
          can&rsquo;t name which costs are variable, that&rsquo;s the first thing to fix.
        </Insight>
      </div>
    </div>
  );
}

/* ---------------- Section shell ---------------- */

export function Tools() {
  return (
    <section id="tools" className="relative border-t border-slate-200 bg-paper">
      <div className="bg-grid-faint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Business tools"
          title="Do the math before you decide."
          description="Three working analyzers built for small-business numbers — no sign-up, no spreadsheet gymnastics. Each one answers a question that changes what you should do next."
        />

        <Tabs defaultValue="break-even" className="mt-12">
          <TabsList className="h-auto w-full max-w-2xl flex-wrap justify-start gap-1 rounded-xl border border-slate-200 bg-white p-1.5">
            <TabsTrigger
              value="break-even"
              className="data-[state=active]:bg-navy-950 data-[state=active]:text-white rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600"
            >
              <Scale className="mr-1.5 h-4 w-4" />
              Break-Even
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="data-[state=active]:bg-navy-950 data-[state=active]:text-white rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600"
            >
              <Percent className="mr-1.5 h-4 w-4" />
              Pricing &amp; Margin
            </TabsTrigger>
            <TabsTrigger
              value="costs"
              className="data-[state=active]:bg-navy-950 data-[state=active]:text-white rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600"
            >
              <Calculator className="mr-1.5 h-4 w-4" />
              Cost Structure
            </TabsTrigger>
          </TabsList>

          <TabsContent value="break-even" className="mt-6">
            <BreakEvenTool />
          </TabsContent>
          <TabsContent value="pricing" className="mt-6">
            <PricingTool />
          </TabsContent>
          <TabsContent value="costs" className="mt-6">
            <CostStructureTool />
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex items-start gap-2.5 text-xs text-slate-500">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-signal-green-deep" />
          All calculations run in your browser — nothing you type is stored or sent anywhere.
        </div>
      </div>
    </section>
  );
}
