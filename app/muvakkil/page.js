import { getMuvakkilAll } from "@/lib/actions";
import Link from "next/link";

export default async function MuvakkilPage() {
  const list = await getMuvakkilAll();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👤 मुवक्किल</h1>
        <Link href="/muvakkil/naya" className="btn-primary">+ नया मुवक्किल</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-gray-400">
            कोई मुवक्किल नहीं — नया मुवक्किल जोड़ें
          </div>
        ) : (
          list.map((m) => (
            <Link key={m.id} href={`/muvakkil/${m.id}`} className="card hover:shadow-md transition block">
              <div className="font-bold text-gray-800">{m.naam}</div>
              {m.pita_naam && (
                <div className="text-sm text-gray-500">पिता: {m.pita_naam}</div>
              )}
              {m.mobile && (
                <div className="text-sm text-red-700 mt-1">📞 {m.mobile}</div>
              )}
              {m.pata && (
                <div className="text-xs text-gray-400 mt-1 truncate">{m.pata}</div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
