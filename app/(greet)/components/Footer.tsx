import { Button } from "@/components/ui/button"
import Image from "next/image"


const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-[#DDEDF4]">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
            <div>
                &copy; 2024 Clean Code all rights reserved.
            </div>
            <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                <Button variant='ghost'>
                    facebook
                </Button>
                <Button variant='ghost'>
                    twitter
                </Button>
                <Button variant='ghost'>
                    instagram
                </Button>
                <Button variant='ghost'>
                    GitHub
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Footer