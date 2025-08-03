import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h2>Page not found!!! &nbsp;</h2>
      <p>
        <Link href="/" className="underline">
          Switch to Home Page
        </Link>
      </p>
    </div>
  );
}
