import { Edit3, Trash2, UserRound } from "lucide-react";

export default function PatientTable({ patients, onEdit, onDelete, onView }) {
  if (!patients.length) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <UserRound size={42} className="mb-3 text-zinc-600" />
        <p className="font-medium text-zinc-300">No patients found</p>
        <p className="mt-1 text-sm text-zinc-500">Create a patient or change your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/[0.025] text-xs uppercase tracking-wider text-zinc-500">
          <tr>
            <th className="px-5 py-4">Patient</th>
            <th className="px-5 py-4">City</th>
            <th className="px-5 py-4">Age</th>
            <th className="px-5 py-4">Gender</th>
            <th className="px-5 py-4">BMI</th>
            <th className="px-5 py-4">Verdict</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06]">
          {patients.map((patient) => (
            <tr key={patient.id} className="transition hover:bg-white/[0.025]">
              <td className="px-5 py-4">
                <button onClick={() => onView(patient)} className="text-left">
                  <p className="font-medium text-zinc-100 hover:text-indigo-300">{patient.name}</p>
                  <p className="text-xs text-zinc-500">{patient.id}</p>
                </button>
              </td>
              <td className="px-5 py-4 text-zinc-300">{patient.city}</td>
              <td className="px-5 py-4 text-zinc-300">{patient.age}</td>
              <td className="px-5 py-4 capitalize text-zinc-300">{patient.gender}</td>
              <td className="px-5 py-4 font-semibold text-zinc-200">{patient.bmi ?? "—"}</td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${verdictClass(patient.verdict)}`}>
                  {patient.verdict ?? "—"}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-1">
                  <button onClick={() => onEdit(patient)} className="rounded-lg p-2 text-zinc-400 hover:bg-indigo-500/10 hover:text-indigo-300" title="Edit">
                    <Edit3 size={17} />
                  </button>
                  <button onClick={() => onDelete(patient)} className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-300" title="Delete">
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function verdictClass(verdict) {
  if (verdict === "Normal") return "bg-emerald-500/10 text-emerald-300";
  if (verdict === "Underweight") return "bg-sky-500/10 text-sky-300";
  if (verdict === "Overweight") return "bg-amber-500/10 text-amber-300";
  return "bg-red-500/10 text-red-300";
}
