"use client";

import React from "react";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";

type TranscriptSectionProps = {
  transcript?: string;
};

const TranscriptSection: React.FC<TranscriptSectionProps> = ({ transcript }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!transcript) return null;

  return (
    <div className="mt-8 border-t pt-4">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-blue-500 hover:text-blue-700"
      >
        {isExpanded ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
        {isExpanded ? "Hide Transcript" : "Show Transcript"}
      </button>
      {isExpanded && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg relative">
          <p>{transcript}</p>
          <button 
            onClick={() => navigator.clipboard.writeText(transcript)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            title="Copy transcript"
          >
            <Copy size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TranscriptSection;
