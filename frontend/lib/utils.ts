import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatBodyData(str: string) {
  return str
    .split('-') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' '); 
}
export function formatData(input: string): string {
  if (!input.trim()) return input; 

  return input
    .toLowerCase() 
    .replace(/\b\w/g, char => char.toUpperCase()); 
}