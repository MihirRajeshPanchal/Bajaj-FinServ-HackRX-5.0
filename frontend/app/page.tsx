"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Character from "@/components/ui/Character";
import Link from "next/link";
import { RealisticSVG, SimpleSVG, TimeSVG } from "@/assets/svgs/svgs";

function WhyCard({ svg, heading, content }: { svg: string, heading: string, content: string }) {
  const Svg = (svg === "time")?<TimeSVG className=""/>:(svg === "realistic")?<RealisticSVG className=""/>:<SimpleSVG className=""/>

  return (
    <div className="px-6 py-10 rounded-xl bg-gradient-to-b from-secondary to-accent grid gap-6">
      {Svg}
      <h3 className="text-white text-3xl text-center">{heading}</h3>
      <p className="text-white text-center">{content}</p>
    </div>
  )
}
function FaqCard() {
  const [faqActive,setFaqActive] = useState(false)
  
  return (
    <div className={`faqCard | bg-gradient-to-t from-primary to-accent text-white lg:max-w-screen-lg mx-auto p-4 rounded-xl grid transition-[grid-template-rows] ${faqActive?"grid-rows-[auto_1fr]":"grid-rows-[auto_0fr]"}`}>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">How many colors should I choose?</p>
        <button onClick={()=>setFaqActive(!faqActive)}>open</button>
      </div>
      <p className="leading-loose overflow-hidden">
        Normally, 3 colors are absolutely fine (meaning background, text, and one accent color).
        However, if you want, you can have more. Usually, we don&apos;t add more than 6 colors across a platform. It would just make things too... complicated. Plus, it makes it hard to keep the colors consistent throughout the design.
      </p>
    </div>
  )
}

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
          <Character />
        </div>
        <div className="col-start-1 grid content-start lg:content-center">
          <h1 className="leading-tight text-[clamp(3rem,8.6vw_+_1px,7.5rem)] font-bold">Bajaj 
            <span className="~inline-block bg-gradient-to-l from-secondary to-accent bg-clip-text text-transparent"> HackRx 5.0 </span>
            -Kratos
          </h1>
          <p className="mt-2 text-xl font-medium">From Documents to Dynamic Videos: Transforming Content, Engaging Minds.</p>
          <div className="mt-4 flex gap-3">
            <Link href="#how">
              <button className="py-3.5 px-6 rounded-full border-4 border-accent font-medium hover:bg-accent hover:text-white transition-colors">How does it work?</button>
            </Link>
            <Link href="/home">
              <button className="h-full py-3.5 px-6 rounded-full bg-accent font-medium text-white shadow-[4px_4px_black] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow]">Get Started</button>
            </Link>
          </div>
        </div>
      </div>

      {/* <main className="heroMain">
        <div className="part1" id="why">
          <h2>Why Realtime Colors?</h2>
          <div className="part1-cards">
            <div className="part1-card">
              <svg width="117" height="117" viewBox="0 0 117 117" fill="none" style={{ zIndex: 5 }} className="part1-card-img">
                <circle cx="58.5" cy="58.5" r="58.5" fill="var(--secondary)" />
                <path fillRule="evenodd" clipRule="evenodd" d="M89.4669 8.85912L58.0465 63.9419L2.44746 41.7023C9.66585 17.5806 32.0298 0 58.5 0C69.872 0 80.4861 3.24483 89.4669 8.85912Z" fill="var(--primbuttn)" fillOpacity="0.6" />
                <path d="M81.5 22.5L57.1395 64.8489L32 53.5" stroke="var(--primary)" stroke-width="7.25581" />
              </svg>
              <p className="subtitle highlight">Saves time</p>
              <p>No need to spend hours implementing different variations of colors. Decide right away!</p>
              <div className="part1-card-bg"></div>
            </div>

            <div className="part1-card">
              <svg width="112" height="114" viewBox="0 0 112 114" fill="none" style={{ zIndex: 5 }} className="part1-card-img">
                <rect width="58" height="58" fill="var(--secondary)" />
                <rect x="69" y="25" width="33" height="33" fill="var(--primbuttn)" fillOpacity="0.6" />
                <rect x="69" y="71" width="43" height="43" fill="var(--primary)" fillOpacity="0.2" />
                <rect x="20" y="70" width="38" height="39" fill="var(--primary)" />
              </svg>
              <p className="subtitle highlight">It’s Realistic</p>
              <p>Color Palettes make it hard to pick. This tool distributes the colors on a real website.</p>
              <div className="part1-card-bg"></div>
            </div>

            <div className="part1-card">
              <svg width="179" height="89" viewBox="0 0 179 89" fill="none" style={{ zIndex: 5 }} className="part1-card-img">
                <rect y="26" width="154" height="63" fill="var(--primbuttn)" fillOpacity="0.6" />
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
      </main> */}
      <main className="w-[min(1600px,100%_-_3rem)] mx-auto mt-20 pb-8">
        <div className="why">
          <h2 className="text-center text-[clamp(2rem,3.75vw_+_1px,3rem)] font-semibold">Why Kratos?</h2>
          <div className="grid lg:grid-flow-col gap-8 mt-3">
            <WhyCard svg="time" heading="Saves time" content="No need to spend hours implementing different variations of colors. Decide right away!" />
            <WhyCard svg="realistic" heading="It&apos;s Realistic" content="Color Palettes make it hard to pick. This tool distributes the colors on a real website." />
            <WhyCard svg="simple" heading="It&apos;s simple" content="Push a few buttons, and there you have it! Your very own branding colors, ready to export." />
          </div>
        </div>

        <div className="how | mt-20 grid gap-12 lg:grid-cols-[1.5fr_repeat(2,1fr)] px-6 py-12 lg:py-36 bg-primary rounded-xl text-background">
          <div className="lg:row-span-2">
            <h2 className="text-[clamp(2rem,3.75vw_+_1px,3rem)] font-semibold">How Does it Work?</h2>
            <p className="text-2xl font-medium py-4">Get your personalized color palette in 4 steps.</p>
          </div>
          <div>
            <p className="flex gap-2 before:content-['1'] before:text-5xl before:font-bold before:leading-none leading-[2.5]">Start with two neutral colors for the text and the background.</p>
          </div>
          <div>
            <p className="flex gap-2 before:content-['2'] before:text-5xl before:font-bold before:leading-none leading-[2.5]">Choose your buttons. Primary is for main CTAs, and Secondary is for less important buttons and info cards.</p>
          </div>
          <div>
            <p className="flex gap-2 before:content-['3'] before:text-5xl before:font-bold before:leading-none leading-[2.5]">Accent color is an additional color. It appears in images, highlights, hyperlinks, boxes, cards, etc. It can be the same as your third color (primary button) or another color.</p>
          </div>
          <div>
            <p className="flex gap-2 before:content-['4'] before:text-5xl before:font-bold before:leading-none leading-[2.5]">Happy with the results? Press on “Export” and receive a .zip file with your color palette in .png and your color codes in .txt files.</p>
          </div>
        </div>
        <div className="faq | mt-20">
          <h2 className="text-center text-[clamp(2rem,3.75vw_+_1px,3rem)] font-semibold">FAQ</h2>
          <p className="text-center text-xl font-medium py-2">Answers to some questions you might have.</p>
          <div className="faqCards grid gap-2">
            <FaqCard/>
            <FaqCard/>
            <FaqCard/>
          </div>
        </div>
        <h2 className="mt-20 text-center text-[clamp(2rem,3.75vw_+_1px,3rem)] font-semibold">Made with love by Kratos - the HackRx Dev Team 💝</h2>
        <p className="text-center text-lg">Checkout the GitHub Repository</p>
        <Link href="https://github.com/MihirRajeshPanchal/Bajaj-FinServ-HackRX-5.0" target="_blank">
          <p className="w-fit mx-auto py-2 px-6 rounded-lg mt-4 bg-black text-white font-medium">GitHub</p>
        </Link>
      </main>
    </div>
    // </BackgroundBeamsWithCollision>
  );
}