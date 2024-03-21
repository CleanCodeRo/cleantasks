import { Button } from "@/components/ui/button"
import { Facebook, GithubIcon, Instagram, Twitter } from "lucide-react"
import Link from "next/link"


const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-1 border-t bg-[#DDEDF4] gap-y-2">
        <div className="md:max-w-screen-2xl mx-auto flex flex-col items-center w-full justify-center">
            <div>
                &copy; 2024 Clean Code all rights reserved.
            </div>
            <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                <Button variant='ghost'>
                    <Facebook className="h-6 w-6" />
                </Button>
                <Button variant='ghost'>
                    <Twitter className="h-6 w-6" />
                </Button>
                <Button variant='ghost'>
                    <Instagram className="h-6 w-6" />
                </Button>
                <Link href='https://github.com/CleanCodeRo'>
                    <Button variant='ghost'>
                        <GithubIcon className="h-6 w-6"/>
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Footer