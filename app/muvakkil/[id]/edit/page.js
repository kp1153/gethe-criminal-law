import { getMuvakkilById, updateMuvakkil, deleteMuvakkil } from "@/lib/actions";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function MuvakkilEditPage({ params }) {
  const { id } = await params;
  const m = await getMuvakkilById(parseInt(id));
  if (!m) notFound();

  async function handleUpdate(formData) {
    "use server";
    await updateMuvakkil(parseInt(id), formData);
    redirect(`/muvakkil/${id}`);
  }

  async function handleDelete() {
    "use server";
    await deleteMuvakkil(parseInt(id));
    redirect("/muvakkil");
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/muvakkil/${id}`} className="text-gray-400 hover:text-gray-600 text-sm">← वापस</Link>
        <h1 className="text-xl font-bold text-gray-800">मुवक्किल संपादन</h1>
      </div>

      <div className="card max-w-lg">
        <form action={handleUpdate} className="space-y-4">
          <div>
            <label className="label">पूरा नाम *</label>
            <input type="text" name="naam" required defaultValue={m.naam} className="input" />
          </div>
          <div>
            <label className="label">पिता का नाम</label>
            <input type="text" name="pita_naam" defaultValue={m.pita_naam || ""} className="input" />
          </div>
          <div>
            <label className="label">मोबाइल नंबर</label>
            <input type="tel" name="mobile" defaultValue={m.mobile || ""} className="input" />
          </div>
          <div>
            <label className="label">पता</label>
            <textarea name="pata" rows={2} defaultValue={m.pata || ""} className="input" />
          </div>
          <div>
            <label className="label">नोट</label>
            <textarea name="notes" rows={2} defaultValue={m.notes || ""} className="input" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">सेव करें</button>
            <Link href={`/muvakkil/${id}`} className="btn-secondary">रद्द करें</Link>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-red-100">
          <form action={handleDelete}>
            <button type="submit"
              className="text-sm text-red-600 hover:text-red-800 hover:underline"
              onclick="return confirm('क्या आप वाकई इस मुवक्किल को हटाना चाहते हैं?')">
              🗑️ इस मुवक्किल को हटाएं
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}