"use server";

import { db } from "@/lib/db";
import { muvakkil, muqadma, tarikh, fees } from "@/drizzle/schema";
import { eq, desc, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ─── मुवक्किल ────────────────────────────────────────────
export async function getMuvakkilAll() {
  return await db.select().from(muvakkil).orderBy(desc(muvakkil.createdAt));
}

export async function getMuvakkilById(id) {
  const result = await db.select().from(muvakkil).where(eq(muvakkil.id, id));
  return result[0];
}

export async function addMuvakkil(formData) {
  await db.insert(muvakkil).values({
    naam: formData.get("naam"),
    pita_naam: formData.get("pita_naam"),
    mobile: formData.get("mobile"),
    pata: formData.get("pata"),
    notes: formData.get("notes"),
  });
  revalidatePath("/muvakkil");
}

export async function updateMuvakkil(id, formData) {
  await db.update(muvakkil)
    .set({
      naam: formData.get("naam"),
      pita_naam: formData.get("pita_naam"),
      mobile: formData.get("mobile"),
      pata: formData.get("pata"),
      notes: formData.get("notes"),
    })
    .where(eq(muvakkil.id, id));
  revalidatePath("/muvakkil");
  revalidatePath(`/muvakkil/${id}`);
}

export async function deleteMuvakkil(id) {
  await db.delete(muvakkil).where(eq(muvakkil.id, id));
  revalidatePath("/muvakkil");
}

// ─── मुकदमा ────────────────────────────────────────────
export async function getMuqadmaAll() {
  return await db
    .select({
      id: muqadma.id,
      title: muqadma.title,
      muqadma_number: muqadma.muqadma_number,
      court: muqadma.court,
      dhara: muqadma.dhara,
      prakar: muqadma.prakar,
      status: muqadma.status,
      muvakkil_naam: muvakkil.naam,
      muvakkil_id: muqadma.muvakkil_id,
    })
    .from(muqadma)
    .leftJoin(muvakkil, eq(muqadma.muvakkil_id, muvakkil.id))
    .orderBy(desc(muqadma.createdAt));
}

export async function getMuqadmaById(id) {
  const result = await db
    .select({
      id: muqadma.id,
      title: muqadma.title,
      muqadma_number: muqadma.muqadma_number,
      court: muqadma.court,
      judge: muqadma.judge,
      dhara: muqadma.dhara,
      prakar: muqadma.prakar,
      status: muqadma.status,
      notes: muqadma.notes,
      muvakkil_naam: muvakkil.naam,
      muvakkil_mobile: muvakkil.mobile,
      muvakkil_id: muqadma.muvakkil_id,
    })
    .from(muqadma)
    .leftJoin(muvakkil, eq(muqadma.muvakkil_id, muvakkil.id))
    .where(eq(muqadma.id, id));
  return result[0];
}

export async function addMuqadma(formData) {
  await db.insert(muqadma).values({
    title: formData.get("title"),
    muqadma_number: formData.get("muqadma_number"),
    muvakkil_id: parseInt(formData.get("muvakkil_id")),
    court: formData.get("court"),
    judge: formData.get("judge"),
    dhara: formData.get("dhara"),
    prakar: formData.get("prakar"),
    status: formData.get("status") || "chalू",
    notes: formData.get("notes"),
  });
  revalidatePath("/muqadme");
}

export async function updateMuqadma(id, formData) {
  await db.update(muqadma)
    .set({
      title: formData.get("title"),
      muqadma_number: formData.get("muqadma_number"),
      court: formData.get("court"),
      judge: formData.get("judge"),
      dhara: formData.get("dhara"),
      prakar: formData.get("prakar"),
      status: formData.get("status"),
      notes: formData.get("notes"),
    })
    .where(eq(muqadma.id, id));
  revalidatePath("/muqadme");
  revalidatePath(`/muqadme/${id}`);
}

export async function deleteMuqadma(id) {
  await db.delete(muqadma).where(eq(muqadma.id, id));
  revalidatePath("/muqadme");
}

// ─── तारीख ────────────────────────────────────────────
export async function getTarikhByMuqadma(muqadma_id) {
  return await db
    .select()
    .from(tarikh)
    .where(eq(tarikh.muqadma_id, muqadma_id))
    .orderBy(desc(tarikh.tarikh_date));
}

export async function getAajKiTarikh() {
  const today = new Date().toISOString().split("T")[0];
  return await db
    .select({
      id: tarikh.id,
      tarikh_date: tarikh.tarikh_date,
      agli_tarikh: tarikh.agli_tarikh,
      muqadma_title: muqadma.title,
      muqadma_id: tarikh.muqadma_id,
      court: muqadma.court,
      muvakkil_naam: muvakkil.naam,
      muvakkil_mobile: muvakkil.mobile,
    })
    .from(tarikh)
    .leftJoin(muqadma, eq(tarikh.muqadma_id, muqadma.id))
    .leftJoin(muvakkil, eq(muqadma.muvakkil_id, muvakkil.id))
    .where(gte(tarikh.agli_tarikh, today))
    .orderBy(tarikh.agli_tarikh);
}

export async function addTarikh(formData) {
  await db.insert(tarikh).values({
    muqadma_id: parseInt(formData.get("muqadma_id")),
    tarikh_date: formData.get("tarikh_date"),
    karyavahi: formData.get("karyavahi"),
    agli_tarikh: formData.get("agli_tarikh") || null,
    notes: formData.get("notes"),
  });
  revalidatePath(`/muqadme/${formData.get("muqadma_id")}`);
}

export async function deleteTarikh(id, muqadma_id) {
  await db.delete(tarikh).where(eq(tarikh.id, id));
  revalidatePath(`/muqadme/${muqadma_id}`);
}

// ─── फीस ────────────────────────────────────────────
export async function getFeesByMuvakkil(muvakkil_id) {
  return await db
    .select({
      id: fees.id,
      rakam: fees.rakam,
      prakar: fees.prakar,
      status: fees.status,
      tarikh: fees.tarikh,
      notes: fees.notes,
      muqadma_title: muqadma.title,
    })
    .from(fees)
    .leftJoin(muqadma, eq(fees.muqadma_id, muqadma.id))
    .where(eq(fees.muvakkil_id, muvakkil_id))
    .orderBy(desc(fees.createdAt));
}

export async function addFees(formData) {
  const muqadma_id = formData.get("muqadma_id");
  await db.insert(fees).values({
    muvakkil_id: parseInt(formData.get("muvakkil_id")),
    muqadma_id: muqadma_id ? parseInt(muqadma_id) : null,
    rakam: parseInt(formData.get("rakam")),
    prakar: formData.get("prakar") || "naqdī",
    status: formData.get("status") || "mila",
    tarikh: formData.get("tarikh") || null,
    notes: formData.get("notes"),
  });
  revalidatePath("/fees");
}

export async function deleteFees(id) {
  await db.delete(fees).where(eq(fees.id, id));
  revalidatePath("/fees");
}

export async function updateFees(id, formData) {
  await db.update(fees)
    .set({
      rakam: parseInt(formData.get("rakam")),
      prakar: formData.get("prakar"),
      status: formData.get("status"),
      tarikh: formData.get("tarikh") || null,
      notes: formData.get("notes"),
    })
    .where(eq(fees.id, id));
  revalidatePath("/fees");
}

export async function getDashboardStats() {
  const [muqadmeTotal, muvakkilTotal, aajKiTarikh, baqiFees] = await Promise.all([
    db.select().from(muqadma),
    db.select().from(muvakkil),
    getAajKiTarikh(),
    db.select().from(fees).where(eq(fees.status, "baakī")),
  ]);

  const totalBaqi = baqiFees.reduce((sum, f) => sum + f.rakam, 0);

  return {
    muqadmeTotal: muqadmeTotal.length,
    muvakkilTotal: muvakkilTotal.length,
    aajKiTarikhCount: aajKiTarikh.length,
    aajKiTarikh: aajKiTarikh.slice(0, 5),
    totalBaqi,
  };
}