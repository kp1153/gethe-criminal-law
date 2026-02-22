export default function LoginPage() {
  async function handleLogin(formData) {
    "use server";
    const { cookies } = await import("next/headers");
    const { redirect } = await import("next/navigation");
    const password = formData.get("password");
    if (password === process.env.SHOP_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("auth", password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      redirect("/dashboard");
    } else {
      redirect("/login?error=1");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-red-700 font-bold text-sm uppercase tracking-wider">Criminal Law Chamber</div>
          <div className="text-gray-800 font-bold text-xl mt-1">Adv. Ajay Kumar Gethe</div>
          <div className="text-gray-400 text-xs mt-1">मुकदमा प्रबंधन</div>
        </div>
        <form action={handleLogin} className="space-y-4">
          <div>
            <label className="label">पासवर्ड</label>
            <input type="password" name="password" required className="input" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary w-full">लॉगिन करें</button>
        </form>
      </div>
    </div>
  );
}