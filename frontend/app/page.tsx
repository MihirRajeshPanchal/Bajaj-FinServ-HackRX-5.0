import Character from "@/components/ui/Character";
import Link from "next/link";
import { GitHub } from "@/assets/svgs/svgs";
import WhyCard from "@/components/ui/WhyCard";
import FaqCard from "@/components/ui/FaqCard";

export default function Page() {
  return (
    <div className="pageWrapper ff-space-grotesk | pt-14 lg:pt-0 px-6 lg:px-12 overflow-hidden">
      <div className="hero | min-h-svh grid gap-4 ~auto-rows-fr lg:grid-cols-[1fr_0.75fr] lg:grid-flow-col">
        <div className="grid *:[grid-area:1/-1] content-center p-4 lg:px-16">
          <div className="blurredCircles | relative w-1/2 h-1/2 place-self-center animate-spin [animation-duration:36s]">
            <div className="absolute w-[200%] h-[200%] rounded-full bg-primary blur-[25px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-full h-full rounded-full bg-accent blur-[25px] -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute w-full h-full rounded-full bg-accent blur-[25px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
          <Character />
        </div>
        <div className="col-start-1 grid content-start lg:content-center">
          <h1 className="leading-tight text-[clamp(3rem,8.6vw_+_1px,7.5rem)] font-bold">Bajaj
            <span className="~inline-block bg-gradient-to-l from-secondary to-accent bg-clip-text text-transparent"> HackRx 5.0 </span>
            Kratos
          </h1>
          <p className="mt-2 lg:text-xl font-medium">From Documents to Dynamic Videos: Transforming Content, Engaging Minds.</p>
          <div className="mt-4 flex gap-3">
            <Link href="#landingHow">
              <button className="text-xs lg:text-base py-3.5 px-6 rounded-full border-4 border-accent font-medium hover:bg-accent hover:text-white transition-colors">How does it work?</button>
            </Link>
            <Link href="/home">
              <button className="text-xs lg:text-base h-full py-3.5 px-6 rounded-full bg-accent font-medium text-white shadow-[4px_4px_black] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow]">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
      <main className="w-[min(1600px,100%)] mx-auto mt-20 pb-8">
        <div className="why">
            <h2 className="text-center text-[clamp(2rem,3.75vw_+_1px,3rem)] font-semibold">Why Kratos?</h2>
            <div className="grid lg:grid-flow-col gap-8 mt-3">
                <WhyCard svg="time" heading="AI-Powered Video Generation" content="Automatically convert brochures and PDFs into engaging, visually-appealing videos with dynamic transitions and voiceovers." color="#140f37" />
                <WhyCard svg="realistic" heading="Interactive Quizzes" content="Generate customized quizzes from the video content to enhance user comprehension and engagement." color="#140f37" />
                <WhyCard svg="simple" heading="Advanced Analytics Dashboard" content="Track user interactions with detailed metrics such as video playtime, quiz performance, and engagement insights." color="#140f37" />
            </div>
        </div>
        <div id="landingHow" className="how smooth-scroll | mt-20 grid gap-12 lg:grid-cols-[1.5fr_repeat(2,1fr)] px-6 py-12 lg:py-36 bg-gradient-to-r from-[#e5ebf6] to-[#0e9fc4] rounded-xl text-text border border-b-stone-900">

          <div className="lg:row-span-2">
            <h2 className="text-[clamp(2rem,3.75vw_+_1px,3rem)] font-semibold">How Does it Work?</h2>
            <p className="text-2xl font-medium py-4">Create Engaging Videos in Just 4 Steps.</p>
          </div>
          <div>
            <p className="flex gap-2 before:content-['1'] before:text-5xl before:font-bold before:leading-none leading-[2.5]">Start by uploading your brochures or PDFs. Our AI system will analyze the text to extract key insights.</p>
          </div>
          <div>
            <p className="flex gap-2 before:content-['2'] before:text-5xl before:font-bold before:leading-none leading-[2.5]">The AI converts the extracted content into a video, adding visuals, transitions, and voiceovers automatically.</p>
          </div>
          <div>
            <p className="flex gap-2 before:content-['3'] before:text-5xl before:font-bold before:leading-none leading-[2.5]">A customized quiz is generated based on the video content to test viewer comprehension and engagement.</p>
          </div>
          <div>
            <p className="flex gap-2 before:content-['4'] before:text-5xl before:font-bold before:leading-none leading-[2.5]">View detailed analytics on how users interact with the video and quiz, including performance metrics and engagement data.</p>
          </div>
        </div>
        <div className="faq | mt-20">
          <h2 className="text-center text-[clamp(2rem,3.75vw_+_1px,3rem)] font-semibold">FAQ</h2>
          <p className="text-center text-xl font-medium py-2">Answers to some questions you might have.</p>
          <div className="faqCards grid gap-2">
            <FaqCard
              title="How long does it take to generate a video?"
              content="It usually takes just a few minutes, depending on the complexity of the document."
            />
            <FaqCard
              title="What types of documents are supported?"
              content="Our system supports brochures, PDFs, and other text-based inputs."
            />
            <FaqCard
              title="Can I customize the video content?"
              content="Yes! You can add your own voiceovers, images, or even adjust the video design."
            />
            <FaqCard
              title="How are the quiz questions generated?"
              content="Our AI extracts key points from the video to create relevant and engaging questions."
            />
            <FaqCard
              title="Is there a limit to how many videos I can create?"
              content="No, you can generate as many videos as you need."
            />
          </div>
        </div>
        <h2 className="mt-20 text-center text-[clamp(2rem,3.75vw_+_1px,3rem)] font-semibold">Made with love by Kratos - the HackRx Dev Team 💝</h2>
        <p className="text-center text-lg">Checkout the GitHub Repository</p>
        <Link href="https://github.com/MihirRajeshPanchal/Bajaj-FinServ-HackRX-5.0" target="_blank">
          <p className="w-fit mx-auto p-3 rounded-lg mt-4 bg-black text-white font-medium flex items-center gap-2">
            <GitHub/>
            GitHub
          </p>
        </Link>
      </main>
    </div>
  );
}