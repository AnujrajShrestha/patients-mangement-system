import { useEffect, useState } from "react";
import { Save } from "lucide-react";

const emptyForm = {
  id: "",
  name: "",
  city: "",
  age: "",
  gender: "male",
  height: "",
  weight: "",
};

export default function PatientForm({ patient, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (patient) {
      setForm({
        id: patient.id ?? "",
        name: patient.name ?? "",
        city: patient.city ?? "",
        age: patient.age ?? "",
        gender: patient.gender ?? "male",
        height: patient.height ?? "",
        weight: patient.weight ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [patient]);

  const change = (e) =>
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
    });
  };

  const editing = Boolean(patient);

  return (
    <form onSubmit={submit} className="space-y-4 p-5">
      {!editing && (
        <Field label="Patient ID">
          <input required name="id" value={form.id} onChange={change} placeholder="P001" />
        </Field>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input required name="name" value={form.name} onChange={change} placeholder="Anuj Shrestha" />
        </Field>
        <Field label="City">
          <input required name="city" value={form.city} onChange={change} placeholder="Butwal" />
        </Field>
        <Field label="Age">
          <input required type="number" min="1" max="119" name="age" value={form.age} onChange={change} />
        </Field>
        <Field label="Gender">
          <select name="gender" value={form.gender} onChange={change}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </Field>
        <Field label="Height (m)">
          <input required type="number" min="0.01" step="0.01" name="height" value={form.height} onChange={change} placeholder="1.70" />
        </Field>
        <Field label="Weight (kg)">
          <input required type="number" min="0.01" step="0.1" name="weight" value={form.weight} onChange={change} placeholder="65" />
        </Field>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5">
          Cancel
        </button>
        <button
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />
          {loading ? "Saving..." : editing ? "Update patient" : "Create patient"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="space-y-1.5">
      <span className="text-xs font-medium text-zinc-400">{label}</span>
      {children}
    </label>
  );
}
