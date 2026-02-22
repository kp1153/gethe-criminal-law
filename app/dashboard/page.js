import { getDashboardStats } from "@/lib/actions";
import Link from "next/link";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">डैशबोर्ड</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-red-700">{stats.muqadmeTotal}</div>
          <div className="text-sm text-gray-500 mt-1">कुल मुकदमे</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-700">{stats.muvakkilTotal}</div>
          <div className="text-sm text-gray-500 mt-1">कुल मुवक्किल</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-700">{stats.aajKiTarikhCount}</div>
          <div className="text-sm text-gray-500 mt-1">आने वाली तारीखें</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-700">₹{stats.totalBaqi.toLocaleString("hi-IN")}</div>
          <div className="text-sm text-gray-500 mt-1">बाकी फीस</div>
        </div>
      </div>

      {/* आने वाली तारीखें */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800">📅 आने वाली तारीखें</h2>
          <Link href="/muqadme" className="text-sm text-red-700 hover:underline">सभी देखें →</Link>
        </div>

        {stats.aajKiTarikh.length === 0 ? (
          <p className="text-gray-400 text-sm">कोई आने वाली तारीख नहीं</p>
        ) : (
          <div className="space-y-3">
            {stats.aajKiTarikh.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                <div>
                  <Link href={`/muqadme/${t.muqadma_id}`} className="font-medium text-gray-800 hover:text-red-700">
                    {t.muqadma_title}
                  </Link>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {t.muvakkil_naam} • {t.court}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-700">{t.agli_tarikh}</div>
                  <div className="text-xs text-gray-500">{t.muvakkil_mobile}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
