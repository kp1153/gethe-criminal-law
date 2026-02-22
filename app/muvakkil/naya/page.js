import { addMuvakkil } from "@/lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NayaMuvakkilPage() {
  async function handleAdd(formData) {
    "use server";
    await addMuvakkil(formData);
    redirect("/muvakkil");
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/muvakkil" className="text-gray-400 hover:text-gray-600 text-sm">← वापस</Link>
        <h1 className="text-xl font-bold text-gray-800">नया मुवक्किल</h1>
      </div>

      <div className="card max-w-lg">
        <form action={handleAdd} className="space-y-4">
          <div>
            <label className="label">पूरा नाम *</label>
            <input type="text" name="naam" required className="input" placeholder="राम कुमार" />
          </div>
          <div>
            <label className="label">पिता का नाम</label>
            <input type="text" name="pita_naam" className="input" placeholder="श्याम लाल" />
          </div>
          <div>
            <label className="label">मोबाइल नंबर</label>
            <input type="tel" name="mobile" className="input" placeholder="9876543210" />
          </div>
          <div>
            <label className="label">पता</label>
            <textarea name="pata" rows={2} className="input" placeholder="ग्राम, पोस्ट, जिला..." />
          </div>
          <div>
            <label className="label">नोट</label>
            <textarea name="notes" rows={2} className="input" placeholder="अतिरिक्त जानकारी..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">सेव करें</button>
            <Link href="/muvakkil" className="btn-secondary">रद्द करें</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
