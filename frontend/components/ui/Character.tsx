import Image from 'next/image'
import React from 'react'

export default function Character() {
    return (
        <Image src='/images/test_character.png' alt='Character Image' className='z-10 mx-auto w-full'/>
    )
}
