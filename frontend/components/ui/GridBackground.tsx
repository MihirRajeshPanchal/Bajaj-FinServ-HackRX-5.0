"use client"
import { usePathname } from "next/navigation"
import React from "react"

export default function GridBackground() {
	const route = usePathname()
	const isVisible = (route === "/" || route.endsWith("/quiz"))
	return (
		isVisible ?
			<div className="gridBgWrapper | h-screen sticky top-0 z-0">
				<div className="gridBg | bg-background | before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-screen before:aspect-square"></div>
			</div> : <></>
	)
}
