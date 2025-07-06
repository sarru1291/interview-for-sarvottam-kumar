"use client";

import Link from "next/link";

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <div className="flex h-screen items-center justify-center">
          <h2>Something went wrong!!! &nbsp;</h2>
          <p>
            <Link href="/" className="underline">
              Switch to Home Page
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}
