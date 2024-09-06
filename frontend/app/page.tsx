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
    <div className="pageWrapper ff-space-grotesk">
      <div className="hero | px-12 min-h-svh grid gap-4 auto-rows-fr auto-cols-fr lg:grid-flow-col">
        <div className="content-center">
          <Character/>
        </div>
        <div className="col-start-1 grid content-start lg:content-center">
          <h1 className="leading-tight text-[clamp(3rem,8.6vw_+_1px,7.5rem)] font-bold">Heading, 
            <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HackRx</span>
            -Kratos
          </h1>
          <p className="mt-2 text-xl font-medium">A video & quiz generation tool from PDFs.</p>
          <div className="mt-4 flex gap-3">
            <button className="py-3.5 px-6 border-4 border-accent font-medium hover:bg-accent hover:text-white transition-colors">How does it work?</button>
            <button className="py-3.5 px-6 bg-accent font-medium text-text shadow-[4px_4px_black] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow]">Get Started</button>
          </div>
        </div>
      </div>

      <div className="part2" id="how">
                <div className="part2-left">
                    <h2>How Does it Work?</h2>
                    <p>You'll get your finalized color palette in 4 simple steps.</p>
                </div>
                <div className="part2-right">
                    <p className="one step">Start with two neutral colors for the text and the background.</p>
                    <p className="two step">Choose your buttons. Primary is for main CTAs, and Secondary is for less important buttons and info cards.</p>
                    <p className="three step">Accent color is an additional color. It appears in images, highlights, hyperlinks, boxes, cards, etc. It can be the same as your third color (primary button) or another color.</p>
                    <p className="four step">Happy with the results? Press on “Export” and receive a .zip file with your color palette in .png and your color codes in .txt files.</p>
                </div>
            </div>
    </div>
    // </BackgroundBeamsWithCollision>
  );
}