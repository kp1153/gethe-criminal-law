import { getMuvakkilAll, getMuqadmaAll, addFees, deleteFees } from "@/lib/actions";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { fees, muvakkil, muqadma } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

async function getAllFees() {
  return await db
    .select({
      id: fees.id,
      rakam: fees.rakam,
      prakar: fees.prakar,
      status: fees.status,
      tarikh: fees.tarikh,
      notes: fees.notes,
      muvakkil_naam: muvakkil.naam,
      muvakkil_mobile: muvakkil.mobile,
      muqadma_title: muqadma.title,
    })
    .from(fees)
    .leftJoin(muvakkil, eq(fees.muvakkil_id, muvakkil.id))
    .leftJoin(muqadma, eq(fees.muqadma_id, muqadma.id))
    .orderBy(desc(fees.createdAt));
}

export default async function FeesPage({ searchParams }) {
  const { muvakkil: muvakkilParam } = await searchParams;
  const preSelectedMuvakkilId = muvakkilParam ? parseInt(muvakkilParam) : null;

  const [feesList, muvakkilList, muqadmaList] = await Promise.all([
    getAllFees(),
    getMuvakkilAll(),
    getMuqadmaAll(),
  ]);

  const totalMila = feesList.filter(f => f.status === "mila").reduce((s, f) => s + f.rakam, 0);
  const totalBaqi = feesList.filter(f => f.status === "baakī").reduce((s, f) => s + f.rakam, 0);

  async function handleAdd(formData) {
    "use server";
    await addFees(formData);
    redirect("/fees");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">💰 फीस प्रबंधन</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-800">₹{(totalMila + totalBaqi).toLocaleString("hi-IN")}</div>
          <div className="text-xs text-gray-500 mt-1">कुल फीस</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-700">₹{totalMila.toLocaleString("hi-IN")}</div>
          <div className="text-xs text-gray-500 mt-1">मिली फीस</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-700">₹{totalBaqi.toLocaleString("hi-IN")}</div>
          <div className="text-xs text-gray-500 mt-1">बाकी फीस</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="font-bold text-gray-700 mb-4 border-b pb-2">नई फीस जोड़ें</h2>
          <form action={handleAdd} className="space-y-3">
            <div>
              <label className="label">मुवक्किल *</label>
              <select name="muvakkil_id" required className="input">
                <option value="">-- चुनें --</option>
                {muvakkilList.map((m) => (
                  <option key={m.id} value={m.id} selected={m.id === preSelectedMuvakkilId}>
                    {m.naam}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">मुकदमा</label>
              <select name="muqadma_id" className="input">
                <option value="">-- चुनें --</option>
                {muqadmaList.map((m) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">रकम (₹) *</label>
              <input type="number" name="rakam" required className="input" placeholder="5000" />
            </div>
            <div>
              <label className="label">भुगतान का तरीका</label>
              <select name="prakar" className="input">
                <option value="naqdī">नकदी</option>
                <option value="upi">UPI</option>
                <option value="cheque">चेक</option>
              </select>
            </div>
            <div>
              <label className="label">स्थिति</label>
              <select name="status" className="input">
                <option value="mila">मिली</option>
                <option value="baakī">बाकी</option>
              </select>
            </div>
            <div>
              <label className="label">तारीख</label>
              <input type="date" name="tarikh" className="input" />
            </div>
            <div>
              <label className="label">नोट</label>
              <input type="text" name="notes" className="input" placeholder="अतिरिक्त जानकारी" />
            </div>
            <button type="submit" className="btn-primary w-full">फीस सेव करें</button>
          </form>
        </div>

        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">मुवक्किल</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">मुकदमा</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">रकम</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">तारीख</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">स्थिति</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feesList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">कोई रिकॉर्ड नहीं</td>
                </tr>
              ) : (
                feesList.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{f.muvakkil_naam}</div>
                      <div className="text-xs text-gray-400">{f.muvakkil_mobile}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{f.muqadma_title || "—"}</td>
                    <td className="px-4 py-3 font-bold text-gray-800">₹{f.rakam.toLocaleString("hi-IN")}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{f.tarikh || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${f.status === "mila" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {f.status === "mila" ? "मिली" : "बाकी"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <form action={async () => {
                        "use server";
                        await deleteFees(f.id);
                      }}>
                        <button type="submit" className="text-gray-300 hover:text-red-500 text-xs">🗑️</button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}