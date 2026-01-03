import React from "react";
import Image from "next/image";

export default function CatCard({
  image,
  color,
}: {
  image: string;
  color: string;
}) {
  return (
    <div
      className={`
    relative group overflow-hidden rounded-[2.5rem] shadow-xl 
    w-64 h-64 sm:w-72 sm:h-72 cursor-pointer transition-transform duration-500 hover:-translate-y-2
    bg-linear-to-br ${color}
  `}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

      <div className="h-full flex items-center justify-center relative z-10">
        <div className="relative w-full h-full drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 ">
          <Image src={image} alt="Mascot" fill className="object-cover" />
        </div>

        <div className="absolute top-10 right-10 w-2 h-2 bg-white rounded-full blur-[1px] animate-pulse" />
        <div className="absolute bottom-12 left-12 w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-pulse delay-700" />
      </div>
    </div>
  );
}
