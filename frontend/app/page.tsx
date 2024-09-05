"use client"
import {  useRouter } from "next/navigation";
import {  useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collisions";
import Character from "@/components/ui/Character";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("Parshav"); 
  
  const onClick = () => {
    router.push("/quiz");
  }

  return (
    // <BackgroundBeamsWithCollision>
    <div className="pageWrapper">
      <div className="hero | px-12 min-h-svh grid gap-4 auto-rows-fr auto-cols-fr lg:grid-flow-col">
        <div className="content-center">
          <Character/>
        </div>
        <div className="col-start-1 grid content-start lg:content-center">
          <h1 className="leading-tight text-[clamp(3rem,8.6vw_+_1px,7.5rem)] font-bold">Heading, 
            <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HackRx</span>
            -Kratos
          </h1>
          <p className="mt-2 text-xl font-medium">A vieo & quiz generation tool from PDFs.</p>
          <div className="mt-4 flex gap-3">
            <button className="py-4 px-6 rounded-lg border-4 border-accent font-medium hover:bg-accent hover:text-white transition-colors">How does it work?</button>
            <button className="py-4 px-6 rounded-lg bg-accent font-medium hover:-translate-y-1 transition-transform">Get Started</button>
          </div>
        </div>
      </div>
    </div>
    // </BackgroundBeamsWithCollision>
  );
}