import Link from "next/link";
import { PiArrowUpRight } from "react-icons/pi";

export default function NotFound() {
  return (
    <main className="not-found section-wrap">
      <h1>Page not found.</h1>
      <p>This address may have moved or changed.</p>
      <Link className="primary-link" href="/">
        Back to the portfolio <PiArrowUpRight aria-hidden="true" />
      </Link>
    </main>
  );
}
