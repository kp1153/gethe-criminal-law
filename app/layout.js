import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Adv. Ajay Kumar Gethe | Criminal Law Chamber",
  description: "मुकदमा प्रबंधन सॉफ्टवेयर",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className="bg-gray-50 text-gray-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
