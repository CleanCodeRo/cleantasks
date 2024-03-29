import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-20 px-4 border-b shadow-sm flex items-center bg-[#edf1f3] z-10">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href='/sign-in'>
                Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href='/sign-up'>
                Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
