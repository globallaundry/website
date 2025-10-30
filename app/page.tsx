export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Global Laundry™
      </h1>
      <p className="text-lg text-gray-600 max-w-xl">
        We pick up, clean, and deliver your laundry — fast, fresh, and hassle-free.
      </p>
      <a
        href="https://wa.me/9613392927"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Chat with us on WhatsApp
      </a>
    </main>
  );
}
