"use client"
import { RealisticSVG, SimpleSVG, TimeSVG } from '@/assets/svgs/svgs';
import React, { useRef, useState } from 'react'

export default function WhyCard({ svg, heading, content, color }: { svg: string, heading: string, content: string, color: string }) {
    const [hasIntersected, setHasIntersected] = useState(false)
    const observer = useRef<IntersectionObserver | null>(null)

    const viewportElementRef = (node: HTMLElement | null) => {
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setHasIntersected(true)
            }
        })

        if (node) observer.current.observe(node)
    }

    const Svg = (svg === "time") ? <TimeSVG color={color} /> : (svg === "realistic") ? <RealisticSVG color={color} /> : <SimpleSVG color={color} />;

    return (
        <div
            ref={viewportElementRef}
            className={`whyCard | px-6 py-10 rounded-xl bg-gradient-to-b from-[#e5ebf6] to-[#0e9fc4] grid gap-6 border border-b-stone-900 transition-[transform,opacity] duration-700 [transition-delay:var(--delay)] ${
                hasIntersected?"translate-y-0 opacity-100":"lg:translate-y-1/3 lg:opacity-0"
            }`}
        >
            <div className="flex justify-center items-center">
                {Svg}
            </div>
            <h3 className="text-text text-3xl text-center">{heading}</h3>
            <p className="text-text text-opacity-85 text-center">{content}</p>
        </div>
    );
}
