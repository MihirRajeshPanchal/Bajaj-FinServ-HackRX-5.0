import Link from "next/link"
import LoginButton from "./loginButton"

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
                    <div className="flex items-center">
                        <LoginButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}