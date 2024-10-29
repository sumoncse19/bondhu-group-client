"use client";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

const words = `Welcome to a world of limitless opportunities, where your business grows with every level of success!
`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} className="super-shiny" />;
}
