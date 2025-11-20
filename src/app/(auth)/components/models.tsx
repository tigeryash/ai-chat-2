"use client";
import {
  MarqueeContent,
  MarqueeFade,
  Marquee,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
import { useMemo, useRef, useState } from "react";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(500);
  useGSAP(() => {
    if (!containerRef.current) return;
    const speedObj = { speed: 500 };
    gsap.set(containerRef.current, {
      opacity: 0,
    });
    gsap.to(containerRef.current, {
      opacity: 1,
      delay: 1,
      duration: 1.5,
      ease: "power2.inOut",
    });
    gsap.to(speedObj, {
      delay: 1.7,
      speed: 70,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setSpeed(speedObj.speed);
      },
    });
  }, { scope: containerRef, dependencies: [] });
  return (
    <div ref={containerRef} className="flex items-center justify-center max-w-screen mt-16"

    >
      <Marquee className="w-full  "
      >
        <MarqueeContent pauseOnHover={true} className="" speed={speed} direction="left">
          {modelEntries.map(([model, Icon]) => (
            <MarqueeItem
              key={model}
              className=""
            >
              <Icon size={80} type="color" className="" />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
};

export default Models;
