"use client";
import {
  MarqueeContent,
  MarqueeFade,
  Marquee,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import {
  OpenAI,
  Claude,
  Gemini,
  DeepSeek,
  Moonshot,
  ZAI,
  Grok,
  Qwen,
  Meta,
} from "@lobehub/icons";
import { useMemo } from "react";

const modelIcons = {
  openai: OpenAI.Combine,
  claude: Claude.Combine,
  gemini: Gemini.Combine,
  deepseek: DeepSeek.Combine,
  qwen: Qwen.Combine,
  grok: Grok.Combine,
  kimi: Moonshot.Combine,
  zai: ZAI.Combine,
  llama: Meta.Combine,
} as const;

const Models = () => {
  const modelEntries = useMemo(() => Object.entries(modelIcons), []);
  return (
    <div className="flex items-center justify-center w-full max-w-full overflow-hidden">
      <Marquee className="w-full">
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent pauseOnHover={true}>
          {modelEntries.map(([model, Icon]) => (
            <MarqueeItem key={model}>
              <Icon size={80} type="color" />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
};

export default Models;
