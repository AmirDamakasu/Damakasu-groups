import { useCallback, useState, useEffect, useMemo } from "react";
import type { Session } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured, type QuoteRequest } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, Download, LogOut, RefreshCw, Mail,
  Package, AlertCircle, CheckCircle, Clock,
  Shield, Eye, EyeOff, Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  closed: "bg-green-100 text-green-800 border-green-200",
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  pending: Clock,
  contacted: Mail,
  closed: CheckCircle,
};

type QuoteStatus = NonNullable<QuoteRequest["status"]>;

// ─── Login screen ─────────────────────────────────────────────
// Admins sign in with a Supabase Auth account. Access to quote requests is enforced by
// Row Level Security (public.is_admin()), not by this screen.
function LoginScreen({ notice }: { notice?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setError("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and rebuild.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) {
        setError(
          authError.status === 400 || authError.status === 401
            ? "Incorrect email or password."
            : `Sign-in failed: ${authError.message}`,
        );
        setPassword("");
      }
    } catch {
      setError("Could not reach the authentication server. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card w-full max-w-md rounded-2xl shadow-medium p-10 border border-border/40"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-secondary-foreground" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Damakasu Multi-Link Investment Ltd</p>
        </div>

        {notice && (
          <p className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{notice}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            autoComplete="username"
            placeholder="Admin email"
            aria-label="Admin email"
            value={email}
            disabled={isSubmitting}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            autoFocus
            required
          />
          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              disabled={isSubmitting}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && (
            <p role="alert" className="text-red-600 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </p>
          )}
          <Button type="submit" variant="default" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof QuoteRequest>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [error, setError] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) {
      setError(`Failed to load quote requests: ${err.message}`);
    } else {
      setQuotes(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchQuotes(); }, [fetchQuotes]);

  const updateStatus = async (id: string, status: QuoteStatus) => {
    setError("");
    // .select() returns the updated row, so a silent RLS refusal (zero rows) is detected.
    const { data, error: err } = await supabase.from("quote_requests").update({ status }).eq("id", id).select("id");
    if (err || !data?.length) {
      setError(`Failed to update status${err ? `: ${err.message}` : " — the record was not changed."}`);
      return;
    }
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  const confirmDeleteQuote = async () => {
    if (!deleteTargetId) return;
    setError("");
    const { data, error: err } = await supabase.from("quote_requests").delete().eq("id", deleteTargetId).select("id");
    if (err || !data?.length) {
      setError(`Failed to delete quote${err ? `: ${err.message}` : " — the record was not deleted."}`);
    } else {
      setQuotes((prev) => prev.filter((q) => q.id !== deleteTargetId));
    }
    setDeleteTargetId(null);
  };

  const filtered = useMemo(() => {
    let data = [...quotes];
    if (statusFilter !== "all") data = data.filter((q) => q.status === statusFilter);
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (q) =>
          q.name.toLowerCase().includes(s) ||
          q.email.toLowerCase().includes(s) ||
          (q.company ?? "").toLowerCase().includes(s) ||
          (q.product ?? "").toLowerCase().includes(s)
      );
    }
    data.sort((a, b) => {
      const va = String(a[sortField] ?? "");
      const vb = String(b[sortField] ?? "");
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return data;
  }, [quotes, search, statusFilter, sortField, sortAsc]);

  const exportExcel = () => {
    const rows = filtered.map((q) => ({
      "Full Name": q.name,
      "Email": q.email,
      "Phone": q.phone,
      "Company": q.company,
      "Product": q.product,
      "Message": q.message,
      "Status": q.status,
      "IP Address": q.ip_address,
      "Date Submitted": new Date(q.created_at ?? "").toLocaleString("en-GB"),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [20, 28, 16, 24, 20, 40, 12, 16, 22].map((w) => ({ wch: w }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quote Requests");
    XLSX.writeFile(wb, `quote_requests_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const stats = {
    total: quotes.length,
    pending: quotes.filter((q) => q.status === "pending").length,
    contacted: quotes.filter((q) => q.status === "contacted").length,
    closed: quotes.filter((q) => q.status === "closed").length,
  };

  const toggleSort = (field: keyof QuoteRequest) => {
    if (sortField === field) setSortAsc((v) => !v);
    else { setSortField(field); setSortAsc(true); }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-medium sticky top-0 z-30">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold">Quote Requests Dashboard</h1>
            <p className="text-primary-foreground/70 text-xs mt-0.5">Damakasu Multi-Link Investment Ltd</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={fetchQuotes} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-primary-foreground/80 hover:text-red-300 hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats.total, color: "text-foreground", bg: "bg-card" },
            { label: "Pending", value: stats.pending, color: "text-amber-700", bg: "bg-amber-50" },
            { label: "Contacted", value: stats.contacted, color: "text-blue-700", bg: "bg-blue-50" },
            { label: "Closed", value: stats.closed, color: "text-green-700", bg: "bg-green-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-5 border border-border/40 shadow-soft`}>
              <p className="text-muted-foreground text-sm">{s.label}</p>
              <p className={`font-serif text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, company, or product…"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm min-w-[140px]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
          <Button variant="gold" onClick={exportExcel} className="shrink-0">
            <Download className="w-4 h-4 mr-1" /> Export Excel
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-card rounded-2xl border border-border/40 shadow-soft overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
              <RefreshCw className="w-6 h-6 animate-spin mr-3" />
              Loading quote requests securely…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
              <Package className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-lg font-medium">No quote requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border/40">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer" onClick={() => toggleSort("name")}>Customer</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer" onClick={() => toggleSort("company")}>Company</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer" onClick={() => toggleSort("product")}>Product</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer" onClick={() => toggleSort("created_at")}>Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer" onClick={() => toggleSort("status")}>Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q) => (
                    <tr key={q.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-foreground">{q.name}</p>
                        <a href={`mailto:${q.email}`} className="text-secondary text-xs hover:underline flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" />{q.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{q.company || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{q.product || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                        {new Date(q.created_at ?? "").toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={q.status ?? "pending"}
                          onChange={(e) => updateStatus(q.id!, e.target.value as QuoteStatus)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none ${STATUS_STYLES[q.status ?? "pending"]}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <a href={`mailto:${q.email}?subject=Re: Quote`} className="text-xs bg-secondary/10 text-secondary hover:bg-secondary/20 px-2.5 py-1 rounded-md">Reply</a>
                          <button onClick={() => setDeleteTargetId(q.id!)} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card p-6 rounded-2xl max-w-sm w-full border border-border shadow-medium">
              <h3 className="font-serif text-lg font-bold text-foreground">Confirm Deletion</h3>
              <p className="text-muted-foreground text-sm mt-2">Are you sure you want to delete this quote request? This action cannot be undone.</p>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" size="sm" onClick={() => setDeleteTargetId(null)}>Cancel</Button>
                <Button variant="destructive" size="sm" onClick={confirmDeleteQuote}>Delete</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

type AdminState = "loading" | "signed-out" | "not-admin" | "admin";

export default function Admin() {
  const [state, setState] = useState<AdminState>("loading");
  const [notice, setNotice] = useState<string>();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setState("signed-out");
      return;
    }

    let cancelled = false;
    const resolve = async (session: Session | null) => {
      if (!session) {
        if (!cancelled) setState("signed-out");
        return;
      }
      const { data: isAdmin, error } = await supabase.rpc("is_admin");
      if (cancelled) return;
      if (error || !isAdmin) {
        setNotice(error ? `Could not verify admin access: ${error.message}` : "This account does not have admin access.");
        setState("not-admin");
        await supabase.auth.signOut();
        return;
      }
      setNotice(undefined);
      setState("admin");
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") resolve(session);
    });
    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (state === "loading") return <div className="min-h-screen bg-background" />;
  if (state === "admin") return <Dashboard onLogout={() => supabase.auth.signOut()} />;
  return <LoginScreen notice={notice} />;
}
