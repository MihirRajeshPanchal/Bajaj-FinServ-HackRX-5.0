"use client";

import React from "react";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { Hint } from "@/components/hint";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

type TranscriptSectionProps = {
  transcript?: string;
};

const TranscriptSection: React.FC<TranscriptSectionProps> = ({ transcript }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const handleCopy = async () => {
    if (transcript) {
      try {
        await navigator.clipboard.writeText(transcript);
        toast.success("Transcript copied successfully!"); 
      } catch (error) {
        toast.error("Failed to copy transcript."); 
      }
    }
  };

  if (!transcript) return null;

  return (
    <div className="mt-8 border-t pt-4">
      <Toaster />
      <Button 
        onClick={() => setIsExpanded(!isExpanded)}
        variant="board"
      >
        {isExpanded ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
        {isExpanded ? "Hide Transcript" : "Show Transcript"}
      </Button>
      {isExpanded && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg relative">
          <p>{transcript}</p>
          <div className="absolute top-2 right-2">
            <Hint label="Copy transcript" side="bottom" align="center" sideOffset={18}>
              
              <button 
                onClick={handleCopy} 
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <Copy size={16} />
              </button>
            </Hint>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptSection;
