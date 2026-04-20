import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-surface">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page not found</h2>
        <p className="text-muted-foreground mt-2">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
