import { getMuqadmaById, getTarikhByMuqadma, addTarikh, deleteTarikh } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function MuqadmaDetailPage({ params }) {
  const { id } = await params;
  const m = await getMuqadmaById(parseInt(id));
  if (!m) notFound();

  const tarikhList = await getTarikhByMuqadma(parseInt(id));

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/muqadme" className="text-gray-400 hover:text-gray-600 text-sm">← वापस</Link>
        <h1 className="text-xl font-bold text-gray-800">{m.title}</h1>
        {m.status === "chalू" && <span className="badge-chalu">चालू</span>}
        {m.status === "sthafit" && <span className="badge-sthafit">स्थगित</span>}
        {m.status === "nirnit" && <span className="badge-nirnit">निर्णीत</span>}
        <Link href={`/muqadme/${id}/edit`} className="ml-auto btn-secondary text-sm">✏️ संपादन</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 card">
          <h2 className="font-bold text-gray-700 mb-4 border-b pb-2">मुकदमा विवरण</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">मुकदमा संख्या</div>
              <div className="font-medium">{m.muqadma_number || "—"}</div>
            </div>
            <div>
              <div className="text-gray-500">न्यायालय</div>
              <div className="font-medium">{m.court || "—"}</div>
            </div>
            <div>
              <div className="text-gray-500">न्यायाधीश</div>
              <div className="font-medium">{m.judge || "—"}</div>
            </div>
            <div>
              <div className="text-gray-500">धारा</div>
              <div className="font-medium">{m.dhara || "—"}</div>
            </div>
            <div>
              <div className="text-gray-500">प्रकार</div>
              <div className="font-medium">{m.prakar || "—"}</div>
            </div>
            <div>
              <div className="text-gray-500">मुवक्किल</div>
              <div className="font-medium">
                <Link href={`/muvakkil/${m.muvakkil_id}`} className="text-red-700 hover:underline">
                  {m.muvakkil_naam}
                </Link>
              </div>
            </div>
          </div>
          {m.notes && (
            <div className="mt-4 p-3 bg-yellow-50 rounded text-sm text-gray-700">
              <div className="font-medium text-gray-500 mb-1">नोट</div>
              {m.notes}
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="font-bold text-gray-700 mb-4 border-b pb-2">नई तारीख जोड़ें</h2>
          <form action={addTarikh} className="space-y-3">
            <input type="hidden" name="muqadma_id" value={id} />
            <div>
              <label className="label">तारीख</label>
              <input type="date" name="tarikh_date" required className="input" />
            </div>
            <div>
              <label className="label">कार्यवाही</label>
              <input type="text" name="karyavahi" placeholder="क्या हुआ?" className="input" />
            </div>
            <div>
              <label className="label">अगली तारीख</label>
              <input type="date" name="agli_tarikh" className="input" />
            </div>
            <div>
              <label className="label">नोट</label>
              <textarea name="notes" rows={2} className="input" placeholder="अतिरिक्त जानकारी" />
            </div>
            <button type="submit" className="btn-primary w-full">तारीख सेव करें</button>
          </form>
        </div>
      </div>

      <div className="card">
        <h2 className="font-bold text-gray-700 mb-4">📅 तारीखों का इतिहास</h2>
        {tarikhList.length === 0 ? (
          <p className="text-gray-400 text-sm">कोई तारीख नहीं जोड़ी गई</p>
        ) : (
          <div className="space-y-2">
            {tarikhList.map((t) => (
              <div key={t.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg text-sm items-start">
                <div className="text-red-700 font-bold whitespace-nowrap">{t.tarikh_date}</div>
                <div className="flex-1">
                  <div className="text-gray-700">{t.karyavahi || "—"}</div>
                  {t.notes && <div className="text-gray-400 text-xs mt-0.5">{t.notes}</div>}
                </div>
                {t.agli_tarikh && (
                  <div className="text-green-700 font-medium whitespace-nowrap">→ {t.agli_tarikh}</div>
                )}
                <form action={async () => {
                  "use server";
                  await deleteTarikh(t.id, parseInt(id));
                }}>
                  <button type="submit" className="text-gray-300 hover:text-red-500 text-xs ml-2">🗑️</button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}