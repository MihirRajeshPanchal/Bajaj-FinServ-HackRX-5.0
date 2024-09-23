import Link from "next/link"
import LoginButton from "./loginButton"
import { GitHub } from "@/assets/svgs/svgs"

export const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 w-full bg-background ~bg-opacity-10 ~backdrop-blur-[2px] shadow-md">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <Link href="/" className="flex ms-2 md:me-24">
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Bajaj HackRx 5.0</span>
                        </Link>
                    </div>
                    <Link
                        href="https://github.com/MihirRajeshPanchal/Bajaj-FinServ-HackRX-5.0"
                        target="_blank"
                        className="py-1 px-3 bg-black font-medium text-background shadow-[4px_4px_hsl(var(--secondary))] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow] flex items-center gap-1"
                    >
                        <GitHub />
                        GitHub
                    </Link>
                </div>
            </div>
        </nav>
    )
}