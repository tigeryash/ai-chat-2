"use client";
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

const modelIcons = {
  openai: {
    Icon: OpenAI.Combine,
  },
  claude: {
    Icon: Claude.Combine,
  },
  gemini: {
    Icon: Gemini.Combine,
  },
  deepseek: {
    Icon: DeepSeek.Combine,
  },
  qwen: {
    Icon: Qwen.Combine,
  },
  grok: {
    Icon: Grok.Combine,
  },
  kimi: {
    Icon: Moonshot.Combine,
  },
  zai: {
    Icon: ZAI.Combine,
  },
  llama: {
    Icon: Meta.Combine,
  },
};

const Models = () => {
  return (
    <div className="grid grid-cols-2 gap-4 justify-items-center items-center ">
      {Object.entries(modelIcons).map(([model, { Icon }]) => (
        <div key={model}>
          <Icon size={120} />
        </div>
      ))}
    </div>
  );
};

export default Models;
