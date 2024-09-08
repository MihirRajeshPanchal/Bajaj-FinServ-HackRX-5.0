"use client"
import {  useRouter } from "next/navigation";
import {  useState } from "react";
import Character from "@/components/ui/Character";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("Parshav"); 

  return (
    // <BackgroundBeamsWithCollision>
    <div className="pageWrapper ff-space-grotesk | px-6 lg:px-12 overflow-hidden">
      <div className="hero | min-h-svh grid gap-4 ~auto-rows-fr lg:grid-cols-[1fr_0.75fr] lg:grid-flow-col">
        <div className="grid *:[grid-area:1/-1] content-center p-4 lg:px-16">
          <div className="blurredCircles | relative w-1/2 h-1/2 place-self-center animate-spin [animation-duration:36s]">
            <div className="absolute w-[200%] h-[200%] rounded-full bg-primary blur-[70px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-full h-full rounded-full bg-accent blur-[70px] -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute w-full h-full rounded-full bg-accent blur-[70px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
          <Character/>
        </div>
        <div className="col-start-1 grid content-start lg:content-center">
          <h1 className="leading-tight text-[clamp(3rem,8.6vw_+_1px,7.5rem)] font-bold">Heading,
            <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HackRx</span>
            -Kratos
          </h1>
          <p className="mt-2 text-xl font-medium">A video & quiz generation tool from PDFs.</p>
          <div className="mt-4 flex gap-3">
            <button className="py-3.5 px-6 rounded-full border-4 border-accent font-medium hover:bg-accent hover:text-white transition-colors">How does it work?</button>
            <button className="py-3.5 px-6 rounded-full bg-accent font-medium text-white shadow-[4px_4px_black] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow]">Get Started</button>
          </div>
        </div>
      </div>

      <main className="heroMain">
        <div className="part1" id="why">
          <h2>Why Realtime Colors?</h2>
          <div className="part1-cards">
            <div className="part1-card">
              <svg width="117" height="117" viewBox="0 0 117 117" fill="none" style={{ zIndex: 5 }} className="part1-card-img">
                <circle cx="58.5" cy="58.5" r="58.5" fill="var(--secondary)" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M89.4669 8.85912L58.0465 63.9419L2.44746 41.7023C9.66585 17.5806 32.0298 0 58.5 0C69.872 0 80.4861 3.24483 89.4669 8.85912Z" fill="var(--primbuttn)" fill-opacity="0.6" />
                <path d="M81.5 22.5L57.1395 64.8489L32 53.5" stroke="var(--primary)" stroke-width="7.25581" />
              </svg>
              <p className="subtitle highlight">Saves time</p>
              <p>No need to spend hours implementing different variations of colors. Decide right away!</p>
              <div className="part1-card-bg"></div>
            </div>

            <div className="part1-card">
              <svg width="112" height="114" viewBox="0 0 112 114" fill="none" style={{ zIndex: 5 }} className="part1-card-img">
                <rect width="58" height="58" fill="var(--secondary)" />
                <rect x="69" y="25" width="33" height="33" fill="var(--primbuttn)" fill-opacity="0.6" />
                <rect x="69" y="71" width="43" height="43" fill="var(--primary)" fill-opacity="0.2" />
                <rect x="20" y="70" width="38" height="39" fill="var(--primary)" />
              </svg>
              <p className="subtitle highlight">It’s Realistic</p>
              <p>Color Palettes make it hard to pick. This tool distributes the colors on a real website.</p>
              <div className="part1-card-bg"></div>
            </div>

            <div className="part1-card">
              <svg width="179" height="89" viewBox="0 0 179 89" fill="none" style={{ zIndex: 5 }} className="part1-card-img">
                <rect y="26" width="154" height="63" fill="var(--primbuttn)" fill-opacity="0.6" />
                <path d="M142 15.5V0" stroke="var(--primary)" stroke-width="8" />
                <path d="M163 34L178.5 34" stroke="var(--primary)" stroke-width="8" />
                <path d="M158 19.5L170.5 7" stroke="var(--primary)" stroke-width="8" />
                <path d="M63 54L74.5 65L95.5 44" stroke="var(--primary)" stroke-width="8" />
              </svg>
              <p className="subtitle highlight">It’s simple</p>
              <p>Push a few buttons, and there you have it! Your very own branding colors, ready to export.</p>
              <div className="part1-card-bg"></div>
            </div>
          </div>
        </div>

        <div className="part2" id="how">
          <div className="part2-left">
            <h2>How Does it Work?</h2>
            <p>You’ll get your finalized color palette in 4 simple steps.</p>
          </div>
          <div className="part2-right">
            <p className="one step">Start with two neutral colors for the text and the background.</p>
            <p className="two step">Choose your buttons. Primary is for main CTAs, and Secondary is for less important buttons and info cards.</p>
            <p className="three step">Accent color is an additional color. It appears in images, highlights, hyperlinks, boxes, cards, etc. It can be the same as your third color (primary button) or another color.</p>
            <p className="four step">Happy with the results? Press on “Export” and receive a .zip file with your color palette in .png and your color codes in .txt files.</p>
          </div>
        </div>
      </main>
    </div>
    // </BackgroundBeamsWithCollision>
  );
}