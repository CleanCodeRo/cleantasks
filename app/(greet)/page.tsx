import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from '@/lib/utils';
import { Poppins } from "next/font/google";


const headingFont = localFont({
    src: "../../public/fonts/font.woff2",
})

const poppins = Poppins({
    subsets: ['latin'],
    weight: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900'
    ]
})



const GreetPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
        <div className={cn(
            "flex items-center justify-center flex-col",
            headingFont.className
            )}>
            <div className="mb-4 flex flex-wrap text-center justify-center items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                <Medal className="h-6 w-6 mr-2" />
                The 1<sup className="mr-0.5">st</sup>  Clean Code Team Task Management App 
            </div>
            <h1 className="text-3xl md:text-4xl text-center text-neutral-800 mb-6">
                Clean Code tasks helps teams move
            </h1>
            <div className="text-xl md:text-3xl bg-gradient-to-r from-[#8db48e] to-[#4d724d] px-4 py-4 rounded-md w-fit text-[#f5f5f5] text-center">
                work together.
            </div>
        </div>
        <div className={cn(
            "text-sm md:text-md text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
            poppins.className
            )}>
            Collaborate, manage projects, and reach your goals with Clean Code tasks.
        </div>
        <Button className="mt-6" size="lg" asChild>
            <Link href='/sign-up'>
                Get Started
            </Link>
        </Button>
    </div>
  )
};

export default GreetPage;
