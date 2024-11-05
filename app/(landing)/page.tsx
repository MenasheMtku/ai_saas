import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page (Unprotected)</h1>
      <div className="flex gap-4">
        <Link href="/sign-in">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="outline">register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
