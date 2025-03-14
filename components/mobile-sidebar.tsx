"use client";

import { useState, useEffect } from "react";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
