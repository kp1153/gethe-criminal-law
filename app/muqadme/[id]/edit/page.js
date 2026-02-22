import { getMuqadmaById, getMuvakkilAll, updateMuqadma, deleteMuqadma } from "@/lib/actions";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function MuqadmaEditPage({ params }) {
  const { id } = await params;
  const [m, muvakkilList] = await Promise.all([
    getMuqadmaById(parseInt(id)),
    getMuvakkilAll(),
  ]);
  if (!m) notFound();

  async function handleUpdate(formData) {
    "use server";
    await updateMuqadma(parseInt(id), formData);
    redirect(`/muqadme/${id}`);
  }

  async function handleDelete() {
    "use server";
    await deleteMuqadma(parseInt(id));
    redirect("/muqadme");
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/muqadme/${id}`} className="text-gray-400 hover:text-gray-600 text-sm">← वापस</Link>
        <h1 className="text-xl font-bold text-gray-800">मुकदमा संपादन</h1>
      </div>

      <div className="card max-w-2xl">
        <form action={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">मुकदमे का शीर्षक *</label>
              <input type="text" name="title" required defaultValue={m.title} className="input" />
            </div>
            <div>
              <label className="label">मुकदमा संख्या</label>
              <input type="text" name="muqadma_number" defaultValue={m.muqadma_number || ""} className="input" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">न्यायालय</label>
              <input type="text" name="court" defaultValue={m.court || ""} className="input" />
            </div>
            <div>
              <label className="label">न्यायाधीश</label>
              <input type="text" name="judge" defaultValue={m.judge || ""} className="input" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">धारा</label>
              <input type="text" name="dhara" defaultValue={m.dhara || ""} className="input" />
            </div>
            <div>
              <label className="label">प्रकार</label>
              <select name="prakar" defaultValue={m.prakar || "criminal"} className="input">
                <option value="criminal">Criminal</option>
                <option value="bail">Bail</option>
                <option value="appeal">Appeal</option>
                <option value="revision">Revision</option>
                <option value="other">अन्य</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">स्थिति</label>
            <select name="status" defaultValue={m.status} className="input">
              <option value="chalू">चालू</option>
              <option value="sthafit">स्थगित</option>
              <option value="nirnit">निर्णीत</option>
            </select>
          </div>

          <div>
            <label className="label">नोट</label>
            <textarea name="notes" rows={3} defaultValue={m.notes || ""} className="input" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">सेव करें</button>
            <Link href={`/muqadme/${id}`} className="btn-secondary">रद्द करें</Link>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-red-100">
          <form action={handleDelete}>
            <button type="submit" className="text-sm text-red-600 hover:text-red-800 hover:underline">
              🗑️ यह मुकदमा हटाएं
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}