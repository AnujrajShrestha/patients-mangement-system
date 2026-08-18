import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDownAZ,
  ArrowUpAZ,
  HeartPulse,
  Plus,
  RefreshCw,
  Search,
  Users,
  X,
} from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";
import Modal from "./components/Modal";
import PatientForm from "./components/PatientForm";
import PatientTable from "./components/PatientTable";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [patients, setPatients] = useState({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [error, setError] = useState("");

  const loadPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/view`);
      if (!response.ok) throw new Error("Could not load patients");
      setPatients(await response.json());
    } catch (err) {
      setError(`${err.message}. Make sure FastAPI is running on ${API_URL}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const patientList = useMemo(() => {
    let list = Object.entries(patients).map(([id, value]) => ({ id, ...value }));

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    if (sortBy) {
      list.sort((a, b) => {
        const av = Number(a[sortBy] ?? 0);
        const bv = Number(b[sortBy] ?? 0);
        return order === "asc" ? av - bv : bv - av;
      });
    }

    return list;
  }, [patients, search, sortBy, order]);

  const createPatient = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || "Could not create patient");
      setFormOpen(false);
      await loadPatients();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (payload) => {
    setLoading(true);
    try {
      const { id, ...changes } = payload;
      const response = await fetch(`${API_URL}/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || "Could not update patient");
      setFormOpen(false);
      setEditing(null);
      await loadPatients();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (patient) => {
    if (!window.confirm(`Delete ${patient.name} (${patient.id})?`)) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/delete/${patient.id}`, { method: "DELETE" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || "Could not delete patient");
      await loadPatients();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
    setError("");
  };

  const openEdit = (patient) => {
    setEditing(patient);
    setFormOpen(true);
    setError("");
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#09090b]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
              <HeartPulse size={22} />
            </div>
            <div>
              <h1 className="font-semibold tracking-tight">Patient Management</h1>
              <p className="text-xs text-zinc-500">FastAPI + React</p>
            </div>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-400"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add patient</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-indigo-300">
            <Activity size={17} />
            <span className="text-sm font-medium">Patient dashboard</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Manage patient records
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Create, view, update, delete, search and sort patient records through your FastAPI backend.
          </p>
        </section>

        {error && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <span>{error}</span>
            <button onClick={() => setError("")}><X size={17} /></button>
          </div>
        )}

        <section className="mb-5 grid gap-4 sm:grid-cols-2">
          <StatCard icon={<Users size={20} />} label="Total patients" value={Object.keys(patients).length} />
          <StatCard icon={<Activity size={20} />} label="API status" value={error ? "Offline" : "Connected"} />
        </section>

        <section className="glass glow overflow-hidden rounded-2xl">
          <div className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID, name or city..."
                className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-indigo-500/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-300 outline-none focus:border-indigo-500/50"
              >
                <option value="">Sort by...</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
                <option value="bmi">BMI</option>
              </select>

              <button
                disabled={!sortBy}
                onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {order === "asc" ? <ArrowUpAZ size={17} /> : <ArrowDownAZ size={17} />}
                {order}
              </button>

              <button
                onClick={loadPatients}
                disabled={loading}
                className="rounded-xl border border-white/10 p-2.5 text-zinc-400 hover:bg-white/5 hover:text-white disabled:opacity-40"
                title="Refresh"
              >
                <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          <PatientTable
            patients={patientList}
            onEdit={openEdit}
            onDelete={deletePatient}
            onView={setViewing}
          />
        </section>
      </main>

      <Modal
        open={formOpen}
        title={editing ? `Edit ${editing.id}` : "Create patient"}
        onClose={() => { setFormOpen(false); setEditing(null); }}
      >
        <PatientForm
          patient={editing}
          onSubmit={editing ? updatePatient : createPatient}
          onCancel={() => { setFormOpen(false); setEditing(null); }}
          loading={loading}
        />
      </Modal>

      <Modal
        open={Boolean(viewing)}
        title={viewing ? viewing.name : "Patient"}
        onClose={() => setViewing(null)}
      >
        {viewing && (
          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
            <Detail label="Patient ID" value={viewing.id} />
            <Detail label="City" value={viewing.city} />
            <Detail label="Age" value={viewing.age} />
            <Detail label="Gender" value={viewing.gender} />
            <Detail label="Height" value={`${viewing.height} m`} />
            <Detail label="Weight" value={`${viewing.weight} kg`} />
            <Detail label="BMI" value={viewing.bmi} />
            <Detail label="Verdict" value={viewing.verdict} />
          </div>
        )}
      </Modal>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 grid size-10 place-items-center rounded-xl bg-indigo-500/10 text-indigo-300">{icon}</div>
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-3">
      <p className="text-[11px] uppercase tracking-wider text-zinc-600">{label}</p>
      <p className="mt-1 truncate text-sm font-medium capitalize text-zinc-200">{value}</p>
    </div>
  );
}
