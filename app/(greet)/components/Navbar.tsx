import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-20 px-4 border-b shadow-sm flex items-center bg-[#DDEDF4]">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Link href="/" className="h-20 mb-4">
          <Image
            src="/assets/CleanCodeLogo.png"
            width={100}
            height={100}
            alt="logo"
            className="4xs:hidden md:block"
          />
        </Link>
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
