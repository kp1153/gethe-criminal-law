import { sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

// मुवक्किल (Client)
export const muvakkil = sqliteTable("muvakkil", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  naam: text("naam").notNull(),
  pita_naam: text("pita_naam"),
  mobile: text("mobile"),
  pata: text("pata"),
  notes: text("notes"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

// मुकदमा (Case)
export const muqadma = sqliteTable("muqadma", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  muqadma_number: text("muqadma_number"),
  title: text("title").notNull(),
  muvakkil_id: integer("muvakkil_id").references(() => muvakkil.id),
  court: text("court"),          // न्यायालय
  judge: text("judge"),          // न्यायाधीश
  dhara: text("dhara"),          // धारा (IPC sections)
  prakar: text("prakar"),        // प्रकार: criminal / bail / appeal
  status: text("status").default("chalू"), // चालू / निर्णीत / स्थगित
  notes: text("notes"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

// तारीख (Hearing Date)
export const tarikh = sqliteTable("tarikh", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  muqadma_id: integer("muqadma_id").references(() => muqadma.id),
  tarikh_date: text("tarikh_date").notNull(), // YYYY-MM-DD
  karyavahi: text("karyavahi"),   // क्या हुआ उस तारीख को
  agli_tarikh: text("agli_tarikh"), // YYYY-MM-DD अगली तारीख
  notes: text("notes"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

// फीस (Fees)
export const fees = sqliteTable("fees", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  muvakkil_id: integer("muvakkil_id").references(() => muvakkil.id),
  muqadma_id: integer("muqadma_id").references(() => muqadma.id),
  rakam: integer("rakam").notNull(),      // रकम
  prakar: text("prakar").default("naqdī"), // नकदी / cheque / UPI
  status: text("status").default("baakī"), // बाकी / mila
  tarikh: text("tarikh"),                  // कब मिली
  notes: text("notes"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});
