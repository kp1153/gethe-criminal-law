import { getMuvakkilById, getFeesByMuvakkil } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function MuvakkilDetailPage({ params }) {
  const { id } = await params;
  const m = await getMuvakkilById(parseInt(id));
  if (!m) notFound();

  const feesList = await getFeesByMuvakkil(parseInt(id));
  const totalMila = feesList.filter(f => f.status === "mila").reduce((s, f) => s + f.rakam, 0);
  const totalBaqi = feesList.filter(f => f.status === "baakī").reduce((s, f) => s + f.rakam, 0);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/muvakkil" className="text-gray-400 hover:text-gray-600 text-sm">← वापस</Link>
        <h1 className="text-xl font-bold text-gray-800">{m.naam}</h1>
        <Link href={`/muvakkil/${id}/edit`} className="ml-auto btn-secondary text-sm">✏️ संपादन</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="font-bold text-gray-700 mb-3 border-b pb-2">व्यक्तिगत जानकारी</h2>
          <div className="space-y-2 text-sm">
            <div><span className="text-gray-500">पिता: </span>{m.pita_naam || "—"}</div>
            <div><span className="text-gray-500">मोबाइल: </span>
              <a href={`tel:${m.mobile}`} className="text-red-700">{m.mobile || "—"}</a>
            </div>
            <div><span className="text-gray-500">पता: </span>{m.pata || "—"}</div>
            {m.notes && <div className="p-2 bg-yellow-50 rounded text-gray-700 mt-2">{m.notes}</div>}
          </div>
        </div>

        <div className="lg:col-span-2 card">
          <h2 className="font-bold text-gray-700 mb-3 border-b pb-2">फीस का हिसाब</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 p-3 rounded text-center">
              <div className="text-xl font-bold text-green-700">₹{totalMila.toLocaleString("hi-IN")}</div>
              <div className="text-xs text-gray-500">मिली फीस</div>
            </div>
            <div className="bg-red-50 p-3 rounded text-center">
              <div className="text-xl font-bold text-red-700">₹{totalBaqi.toLocaleString("hi-IN")}</div>
              <div className="text-xs text-gray-500">बाकी फीस</div>
            </div>
          </div>

          {feesList.length > 0 && (
            <div className="space-y-2">
              {feesList.map((f) => (
                <div key={f.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{f.muqadma_title || "—"}</span>
                    <span className="text-gray-400 text-xs ml-2">{f.prakar} • {f.tarikh}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={f.status === "mila" ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                      ₹{f.rakam.toLocaleString("hi-IN")}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${f.status === "mila" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {f.status === "mila" ? "मिली" : "बाकी"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link href={`/fees?muvakkil=${id}`} className="text-xs text-red-700 hover:underline mt-3 inline-block">
            + फीस जोड़ें
          </Link>
        </div>
      </div>
    </div>
  );
}