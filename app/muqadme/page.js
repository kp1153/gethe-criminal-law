import { getMuqadmaAll } from "@/lib/actions";
import Link from "next/link";

export default async function MuqadmePage() {
  const muqadme = await getMuqadmaAll();

  const statusBadge = (s) => {
    if (s === "chalू") return <span className="badge-chalu">चालू</span>;
    if (s === "sthafit") return <span className="badge-sthafit">स्थगित</span>;
    return <span className="badge-nirnit">निर्णीत</span>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">⚖️ मुकदमे</h1>
        <Link href="/muqadme/naya" className="btn-primary">+ नया मुकदमा</Link>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">मुकदमा</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">मुवक्किल</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">न्यायालय</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">धारा</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">स्थिति</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {muqadme.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  कोई मुकदमा नहीं — नया मुकदमा जोड़ें
                </td>
              </tr>
            ) : (
              muqadme.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{m.title}</div>
                    {m.muqadma_number && (
                      <div className="text-xs text-gray-400">#{m.muqadma_number}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{m.muvakkil_naam || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{m.court || "—"}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{m.dhara || "—"}</td>
                  <td className="px-4 py-3">{statusBadge(m.status)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/muqadme/${m.id}`} className="text-red-700 hover:underline text-xs">
                      देखें →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
