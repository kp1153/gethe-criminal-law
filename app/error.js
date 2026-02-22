"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card max-w-md text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">कुछ गड़बड़ हो गई</h2>
        <p className="text-gray-500 text-sm mb-4">{error?.message || "अज्ञात त्रुटि"}</p>
        <button onClick={reset} className="btn-primary">दोबारा कोशिश करें</button>
      </div>
    </div>
  );
}