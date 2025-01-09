import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <div><div className=' relative' >
    <div className='h-56 md:h-72 overflow-hidden'>
        <Image
            src="/blog/blog-back.jpg"
            alt=''
            fill 
            objectFit='cover'
        />
        <div className='absolute top-2/4 -translate-y-2/4 right-2/4 translate-x-2/4 '>
            <h2 className='uppercase font-bold m-auto  text-center'>blog</h2>
            <div className='flex gap-3'>
                <span>Home</span>
                <span>|</span>
                <span>blog</span>
            </div>
        </div>
    </div>
</div></div>
  )
}

export default HeroSection