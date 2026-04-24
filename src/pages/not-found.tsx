export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <p className="text-xl text-white/60 mb-8">Page not found</p>
        <a href="/" className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-all">
          Go Home
        </a>
      </div>
    </div>
  );
}
