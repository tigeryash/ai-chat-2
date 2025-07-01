"use client";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const AuthButton = ({
  Icon,
  image,
  name,
  className,
}: {
  Icon?: LucideIcon;
  image?: string;
  name: string;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "py-3 px-4 rounded-xl border border-black flex items-center gap-2 hover:bg-white ",
        " hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-white text-lg overflow-hidden cursor-pointer",
        className
      )}
    >
      {Icon && <Icon size={22} />}
      {image && <Image src={image} alt="" width={20} height={20} />}
      Continue with {name}
    </button>
  );
};

export default AuthButton;
