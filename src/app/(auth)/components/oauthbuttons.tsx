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
      gsap.fromTo(
        ".auth-button > button",
        {
          opacity: 0,
          y: -180,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.3,
          ease: "power4.in",
          delay: 0.12,
        }
      );
    },
    { scope: containerRef }
  );
  return (
    <>
      <div className="border-t border-black/30 h-[1px] w-[85%] mx-auto relative">
        <div className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 bg-slate-300 px-2 text-black/70">
          or sign in with
        </div>
      </div>
      <div ref={containerRef} className="grid grid-cols-2  ">
        <div className="auth-button ">
          <AuthButton Icon={Google} name="google" />
        </div>
        <div className="auth-button ">
          <AuthButton Icon={Github} name="github" />
        </div>
        <div className="auth-button ">
          <AuthButton image={DiscordIcon} name="discord" />
        </div>
        <div className="auth-button ">
          <AuthButton Icon={Phone} name="phone" />
        </div>
      </div>
    </>
  );
};

export default OAuthButtons;
