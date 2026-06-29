import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { supabase, type QuoteRequest } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, Download, LogOut, RefreshCw, Filter,
  ChevronDown, ChevronUp, Mail, Phone, Building2,
  Package, Calendar, AlertCircle, CheckCircle, Clock,
  Shield, Eye, EyeOff,
} from "lucide-react";
import * as XLSX from "xlsx";

// SHA-256 hash of the admin password — never store the plain-text here
const ADMIN_PASSWORD_HASH =
  import.meta.env.VITE_ADMIN_PASSWORD_HASH ??
  "4412680192de761ab275cd417b294881357d49c8e1e81183e32b896bbf4c2f50";

// Hashes a plain-text string using the browser's native Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

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

// ─── Login screen ─────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashed = await hashPassword(password);
    if (hashed === ADMIN_PASSWORD_HASH) {
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
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
          <p className="text-muted-foreground text-sm mt-1">DAMAKASU MULTI-LINK INVESTIMENT LTD</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="pr-10"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </p>
          )}
          <Button type="submit" variant="default" size="lg" className="w-full">
            Sign In
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

  const fetchQuotes = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: err } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setQuotes(data ?? []);
    } catch (e: any) {
      setError("Failed to load quote requests. Check your Supabase configuration.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuotes(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("quote_requests").update({ status }).eq("id", id);
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: status as any } : q)));
  };

  const deleteQuote = async (id: string) => {
    if (!confirm("Delete this quote request? This cannot be undone.")) return;
    await supabase.from("quote_requests").delete().eq("id", id);
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  // Filtered & sorted
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
    data.sort((a: any, b: any) => {
      const va = a[sortField] ?? "";
      const vb = b[sortField] ?? "";
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

  const SortIcon = ({ field }: { field: keyof QuoteRequest }) =>
    sortField === field ? (
      sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
    ) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-medium sticky top-0 z-30">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold">Quote Requests Dashboard</h1>
            <p className="text-primary-foreground/70 text-xs mt-0.5">DAMAKASU MULTI-LINK INVESTIMENT LTD</p>
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
        {/* Stats */}
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

        {/* Controls */}
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

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Table */}
        <div className="bg-card rounded-2xl border border-border/40 shadow-soft overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
              <RefreshCw className="w-6 h-6 animate-spin mr-3" />
              Loading quote requests…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
              <Package className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-lg font-medium">No quote requests found</p>
              <p className="text-sm mt-1">
                {search || statusFilter !== "all" ? "Try adjusting your filters." : "Quote submissions will appear here once the form is connected."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border/40">
                  <tr>
                    {[
                      { label: "Customer", field: "name" as keyof QuoteRequest },
                      { label: "Company", field: "company" as keyof QuoteRequest },
                      { label: "Product", field: "product" as keyof QuoteRequest },
                      { label: "Date", field: "created_at" as keyof QuoteRequest },
                      { label: "Status", field: "status" as keyof QuoteRequest },
                    ].map(({ label, field }) => (
                      <th
                        key={field}
                        className="text-left px-4 py-3 font-semibold text-foreground cursor-pointer hover:text-secondary select-none whitespace-nowrap"
                        onClick={() => toggleSort(field)}
                      >
                        <span className="inline-flex items-center gap-1">{label} <SortIcon field={field} /></span>
                      </th>
                    ))}
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q, i) => {
                    const StatusIcon = STATUS_ICONS[q.status ?? "pending"];
                    return (
                      <motion.tr
                        key={q.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <p className="font-semibold text-foreground">{q.name}</p>
                          <a href={`mailto:${q.email}`} className="text-secondary text-xs hover:underline flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />{q.email}
                          </a>
                          {q.phone && (
                            <a href={`tel:${q.phone}`} className="text-muted-foreground text-xs hover:underline flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />{q.phone}
                            </a>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                            {q.company || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Package className="w-3.5 h-3.5 shrink-0" />
                            {q.product || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          <span className="flex items-center gap-1 text-xs">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            {new Date(q.created_at ?? "").toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={q.status ?? "pending"}
                            onChange={(e) => updateStatus(q.id!, e.target.value)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer outline-none ${STATUS_STYLES[q.status ?? "pending"]}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${q.email}?subject=Re: Your Quote Request for ${q.product}`}
                              className="text-xs bg-secondary/10 text-secondary hover:bg-secondary/20 px-2.5 py-1 rounded-md transition-colors"
                            >
                              Reply
                            </a>
                            <button
                              onClick={() => deleteQuote(q.id!)}
                              className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-2.5 py-1 rounded-md transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="px-4 py-3 border-t border-border/30 text-xs text-muted-foreground">
                Showing {filtered.length} of {quotes.length} total quote requests
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page wrapper ─────────────────────────────────────────────
export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });

  const login = () => {
    sessionStorage.setItem("admin_auth", "true");
    setAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
  };

  return authenticated ? <Dashboard onLogout={logout} /> : <LoginScreen onLogin={login} />;
}
