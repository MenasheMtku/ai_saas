import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";

export default function Navbar() {
  return (
    <div className="w-full justify-between items-center">
      <MobileSidebar />
      <div className="flex w-full justify-end px-8">
        <UserButton />
      </div>
    </div>
  );
}
