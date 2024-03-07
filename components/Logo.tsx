import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Link href="/" className="h-20 mb-4">
          <Image
            src="/assets/CleanCodeLogo.png"
            width={100}
            height={100}
            alt="logo"
            className="4xs:hidden md:block"
          />
        </Link>
    </div>
  )
}

export default Logo