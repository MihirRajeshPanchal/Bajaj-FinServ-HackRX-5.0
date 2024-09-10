"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState } from "react";

interface PdfAccordionProps {
  pdfLink: string;
}

const PdfAccordion: React.FC<PdfAccordionProps> = ({ pdfLink }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsPdfOpen(!isPdfOpen)}
        className="bg-accent bg-opacity-40 text-text px-4 py-2 mt-4 rounded-md hover:bg-accent hover:bg-opacity-50 transition w-full flex justify-between items-center"
      >
        {isPdfOpen ? "Hide PDF" : "Show PDF"}
        <span>{isPdfOpen ? <ArrowUp /> : <ArrowDown />}</span>
      </button>

      {isPdfOpen && (
        <div className="mt-4 border-t pt-4">
          <div className="w-full" style={{ height: "600px" }}>
            <iframe
              src={pdfLink}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfAccordion;
