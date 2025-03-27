import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { string } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  return name
    .split(" ") // Split the name into words
    .map((word) => word[0]) // Get the first letter of each word
    .join("") // Join them together
    .toUpperCase() // Convert to uppercase
    .slice(0, 2); // Keep only the first 2 characters
}
