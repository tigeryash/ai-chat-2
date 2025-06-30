"use client";
import React, { useRef } from "react";
import AuthButton from "./authbutton";
import { Google } from "@lobehub/icons";
import { Github } from "@lobehub/icons";
import { Phone } from "lucide-react";
import DiscordIcon from "../../../../public/discord-icon.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const OAuthButtons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(".auth-button", {
        opacity: 0,
        y: -30,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.inOut",
        delay: 3,
      });
    },
    { scope: containerRef }
  );
  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-4">
      <AuthButton Icon={Google} name="Google" className="auth-button" />
      <AuthButton Icon={Github} name="Github" className="auth-button" />
      <AuthButton image={DiscordIcon} name="Discord" className="auth-button" />
      <AuthButton Icon={Phone} name="Phone" className="auth-button" />
    </div>
  );
};

export default OAuthButtons;
