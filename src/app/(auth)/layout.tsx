"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/all";
import Link from "next/link";
import Models from "./components/models";
import OAuthButtons from "./components/oauthbuttons";
import { usePathname } from "next/navigation";
import Scene from "@/components/background/scene";

gsap.registerPlugin(SplitText);

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!containerRef.current) return;
    const title = new SplitText("#title", {
      type: "chars",
    });
    const subtitle = new SplitText("#subtitle", {
      type: "lines",
    });
    gsap.set(title.chars, {
      y: 100,
    });
    gsap.to(title.chars, {
      y: 0,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out",
    });
    gsap.set(subtitle.lines, {
      y: 100,
    });
    gsap.to(subtitle.lines, {
      y: 0,
      duration: 1.2,
      stagger: 0.075,
      ease: "power4.out",
    });
    gsap.from("#auth", {
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut",
    });

    gsap.from("#footer", {
      opacity: 0,
      duration: 0.7,
      ease: "power2.in",
    });
  }, []);
  return (
    <main className="flex relative flex-col-reverse items-center xl:flex-row min-h-screen lg:h-screen  overflow-hidden p-6 md:p-3 bg-slate-900">
      <Scene />
      <div
        ref={containerRef}
        className="space-y-7 xl:w-full pt-10 md:pt-24 pb-12 text-gray-300 h-full flex flex-col  md:rounded-2xl relative overflow-hidden"
      >
        <Body />

        <Models />
        <Footer />
      </div>
      <div
        id="auth"
        className="xl:w-1/3  md:w-[600px] lg:h-full text-black z-2 w-full"
      >
        <FormContainer pathname={pathname}>{children}</FormContainer>
      </div>
    </main>
  );
};

export default AuthLayout;

const FormContainer = ({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) => {
  return (
    <div className="inset-shadow-lg bg-slate-300/30 flex flex-col pt-10 justify-center items-center space-y-10 rounded-2xl backdrop-blur-md border-[2px] border-white/20">
      <h2 className="text-4xl font-semibold capitalize ">
        {pathname.split("/")}
      </h2>
      {children}
      <OAuthButtons />
    </div>
  );
};

const Body = () => {
  return (
    <>
      <h1
        id="title"
        className="text-5xl md:text-8xl font-bold  py-4 px-10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        High ELO LLMs
      </h1>
      <p
        id="subtitle"
        className="text-2xl font-semibold leading-10 text-pretty px-10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        Chat with the smartest <span className="text-blue-500">AI</span> found
        at the top of the{" "}
        <Link
          className="hover:underline text-blue-500"
          href="https://lmarena.ai/leaderboard"
          target="_blank"
        >
          lmarena&apos;s leaderboard.{" "}
        </Link>
        Built with Nextjs, TailwindCSS, better-auth, drizzle, neondb, gsap, and
        Vercel AI SDK
      </p>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="text-gray-300 mt-auto self-center shadow-lg bg-gray-950/10 rounded-xl py-2 px-4">
      <p>
        Project made by{" "}
        <Link
          href="https://github.com/tigeryash"
          target="_blank"
          className="hover:underline"
        >
          Yash
        </Link>
      </p>
    </footer>
  );
};
