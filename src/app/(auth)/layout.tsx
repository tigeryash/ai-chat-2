"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/all";
import Link from "next/link";
import Models from "./components/models";

gsap.registerPlugin(SplitText);

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
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
      x: 500,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from("#footer", {
      opacity: 0,
      duration: 0.7,
      ease: "power2.in",
    });
  }, []);
  return (
    <main className="flex min-h-screen gradient overflow-hidden">
      <div
        ref={containerRef}
        className="space-y-7 flex-2/3 px-10 pt-24 pb-12 text-gray-300 min-h-screen flex flex-col "
      >
        {/* <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}

        <h1
          id="title"
          className="text-8xl font-bold  py-4"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          High ELO LLMs
        </h1>
        <p
          id="subtitle"
          className="text-2xl font-semibold leading-10"
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
            lmarena&apos;s leaderboard.
          </Link>
          Built with Nextjs, TailwindCSS, better-auth, drizzle, neondb, gsap,
          and Vercel AI SDK
        </p>

        <Models />

        <footer
          id="footer"
          className=" text-gray-300 mt-auto self-center shadow-lg bg-gray-950/10 rounded-xl py-2 px-4 "
        >
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
      </div>

      <div
        id="auth"
        className="flex-1/3 min-h-screen inset-shadow-lg bg-slate-300 "
      >
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
