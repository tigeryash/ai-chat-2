"use client";
import { OpenAI, Claude, Gemini, DeepSeek } from "@lobehub/icons";
import { useState } from "react";

const modelIcons = {
  claude: {
    Icon: Claude,
    ColorIcon: Claude.Color,
  },
  gemini: {
    Icon: Gemini,
    ColorIcon: Gemini.Color,
  },
  deepseek: {
    Icon: DeepSeek,
    ColorIcon: DeepSeek.Color,
  },
};

const Models = () => {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4 justify-center">
      <OpenAI size={160} className="" />
      {Object.entries(modelIcons).map(([model, { Icon, ColorIcon }]) => (
        <div
          key={model}
          onMouseEnter={() => setHoveredModel(model)}
          onMouseLeave={() => setHoveredModel(null)}
        >
          {hoveredModel === model ? (
            <ColorIcon size={160} />
          ) : (
            <Icon size={160} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Models;
