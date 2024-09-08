import Image from 'next/image'
import React from 'react'
import test_character from '@/public/images/test_character.png'

export default function Character() {
    return (
        <Image src={test_character} alt='Character Image' className='z-10 mx-auto w-full'/>
    )
}
