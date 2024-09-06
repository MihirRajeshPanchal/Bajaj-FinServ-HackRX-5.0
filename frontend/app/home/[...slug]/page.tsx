import { Space_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import TranscriptSection from "./_components/transcriptSection";
import TableOfContents from "./_components/tableOfContents";
import QuizButton from "./_components/quizButton";
type PageData = {
  title: string;
  content: string;
  videoUrl?: string;
  transcript?: string;
};

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

async function getPageData(slug: string[]): Promise<PageData> {
  const filePath = slug.join('/');
  console.log('Fetching data for:', filePath);
  return {
    title: slug[slug.length - 1],
    content: `This is the content for ${filePath} lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    videoUrl: undefined,
    transcript: "This is a sample transcript for the video. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nemo in deserunt natus, accusamus voluptatum error cum itaque id illum, quasi quidem nostrum unde nesciunt accusantium sint enim ducimus sit obcaecati? Minima, error nam minus atque optio soluta voluptas, libero exercitationem, non omnis pariatur. Maxime quis, pariatur fugit rem distinctio provident ab nesciunt mollitia tempore natus odit repudiandae perferendis ullam illo debitis doloremque officia. Suscipit vero, corporis nihil consequuntur animi distinctio neque itaque eaque maiores dolores commodi numquam exercitationem nesciunt totam assumenda, optio soluta natus dolorum magnam rerum illo recusandae laboriosam? Assumenda ducimus libero magnam amet aliquam impedit, voluptate sapiente alias molestias tempore molestiae dolore velit voluptates. Totam dolore corrupti maxime esse! Rerum dolorum, pariatur sunt distinctio vero perspiciatis quod quibusdam ducimus natus aliquam laudantium sed libero accusamus repudiandae voluptates dolorem nulla, illo, veritatis rem. Quia, vero natus delectus earum molestiae laborum totam atque nemo, ipsam, minus ut provident? Error dolores vel architecto repellendus sed doloribus officiis blanditiis dignissimos at culpa debitis nemo modi minima voluptate autem officia adipisci reiciendis, accusamus a. Molestias vel debitis eveniet. Possimus dolor laudantium temporibus molestias aliquid, est iste nostrum voluptatem ullam quia et aspernatur pariatur placeat, natus enim aliquam modi laboriosam quis totam exercitationem in. Eligendi sequi quo accusamus earum consequuntur ut sunt odio sint adipisci illum corrupti voluptates temporibus eveniet quos doloribus facilis, dicta aut, error saepe repellat possimus deserunt quasi ducimus aliquam. Explicabo sint illo nobis a deleniti eveniet, facere illum aliquam, sunt officiis, voluptas unde accusamus modi recusandae quis? Inventore veritatis error numquam esse voluptas repudiandae nam ipsam. Veniam sunt dignissimos consectetur! Unde quae maiores voluptatibus reiciendis dolor, animi voluptates omnis, voluptas quis, tenetur dolorum? Aperiam, cum? Nulla unde error, fugit itaque velit perspiciatis ea voluptates totam! Hic, deserunt. Nulla aliquam, fugiat deserunt, aliquid placeat vitae ad deleniti consequuntur modi eligendi atque beatae nihil necessitatibus totam. Modi eveniet hic totam sit veritatis, laudantium vero debitis? Assumenda, dolorem libero? Placeat, dignissimos dolorum quod nesciunt maiores tempore animi autem nemo, natus quam, praesentium ab. At exercitationem nesciunt expedita sed. Perspiciatis optio ipsum illum animi consequuntur sapiente doloribus quibusdam aperiam et error veritatis, recusandae tenetur repudiandae ducimus, libero laboriosam quidem blanditiis facilis explicabo hic! Asperiores delectus sequi numquam fuga earum cupiditate aut deserunt. Expedita autem consequuntur tenetur cupiditate vero quidem! Doloribus magni reprehenderit quos maxime qui corrupti alias, quibusdam commodi temporibus eaque quam voluptas ea id fuga facilis magnam delectus animi repellat, dolorum accusantium libero aspernatur? Inventore, facilis nesciunt sed molestiae, id nostrum aliquid sunt porro voluptatem laudantium officia doloribus nobis aut rem deserunt consequatur blanditiis sit eligendi tenetur! Illo alias exercitationem sapiente facilis voluptatem at delectus qui quisquam incidunt repudiandae et voluptates veritatis provident odit natus accusamus vero laudantium earum asperiores, nulla voluptatibus tempore voluptate. Laudantium consectetur veniam ex earum tenetur enim eos doloribus nihil accusamus alias ut, assumenda voluptatibus atque. Necessitatibus, culpa quaerat. Facere autem, natus neque inventore voluptatum nesciunt omnis fuga id temporibus sint architecto consectetur nostrum ab laboriosam repellendus praesentium quaerat harum explicabo hic ducimus magnam sunt. Hic, molestias aperiam.",
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const pageData = await getPageData(params.slug);

  if (!pageData) {
    notFound();
  }

  const context = params.slug.slice(0, -1).join(" / ");
  const currentPath = `/home/${params.slug.join('/')}`;

  return (
    <div className="grid grid-flow-col gap-4 pt-14">
      <div className="py-16 px-[clamp(2rem,3.125vw,4rem)]">
        <p className={cn("text-sm text-gray-500 mb-2", font.className)}>{context}</p>
        <h1 className={cn("text-4xl font-bold mb-6", font.className)}>{pageData.title}</h1>
        <div className="flex gap-8">
          <div className="flex-grow">
            <p className="mb-8 leading-relaxed font-sans">{pageData.content}</p>
            <div className="space-y-4">
              {pageData.videoUrl ? (
                <div className="aspect-video mb-4">
                  <iframe src={pageData.videoUrl} className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg">Generate video</button>
              )}
              <QuizButton path={currentPath} />
            </div>
            <TranscriptSection transcript={pageData.transcript} />
          </div>
        </div>
      </div>
      <TableOfContents content={pageData.content} />
    </div>
  );
}
