import { getMuvakkilAll, addMuqadma } from "@/lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NayaMuqadmaPage() {
  const muvakkilList = await getMuvakkilAll();

  async function handleAdd(formData) {
    "use server";
    await addMuqadma(formData);
    redirect("/muqadme");
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/muqadme" className="text-gray-400 hover:text-gray-600 text-sm">← वापस</Link>
        <h1 className="text-xl font-bold text-gray-800">नया मुकदमा</h1>
      </div>

      <div className="card max-w-2xl">
        <form action={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">मुकदमे का शीर्षक *</label>
              <input type="text" name="title" required className="input" placeholder="State vs. XYZ" />
            </div>
            <div>
              <label className="label">मुकदमा संख्या</label>
              <input type="text" name="muqadma_number" className="input" placeholder="CR No. 123/2026" />
            </div>
          </div>

          <div>
            <label className="label">मुवक्किल *</label>
            <select name="muvakkil_id" required className="input">
              <option value="">-- चुनें --</option>
              {muvakkilList.map((m) => (
                <option key={m.id} value={m.id}>{m.naam} {m.mobile ? `(${m.mobile})` : ""}</option>
              ))}
            </select>
            <Link href="/muvakkil/naya" className="text-xs text-red-700 hover:underline mt-1 inline-block">
              + नया मुवक्किल जोड़ें
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">न्यायालय</label>
              <input type="text" name="court" className="input" placeholder="CJM Court, Varanasi" />
            </div>
            <div>
              <label className="label">न्यायाधीश</label>
              <input type="text" name="judge" className="input" placeholder="न्यायाधीश का नाम" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">धारा (IPC/CrPC)</label>
              <input type="text" name="dhara" className="input" placeholder="302, 307, 420..." />
            </div>
            <div>
              <label className="label">प्रकार</label>
              <select name="prakar" className="input">
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
            <select name="status" className="input">
              <option value="chalू">चालू</option>
              <option value="sthafit">स्थगित</option>
              <option value="nirnit">निर्णीत</option>
            </select>
          </div>

          <div>
            <label className="label">नोट</label>
            <textarea name="notes" rows={3} className="input" placeholder="अतिरिक्त जानकारी..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">मुकदमा सेव करें</button>
            <Link href="/muqadme" className="btn-secondary">रद्द करें</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
