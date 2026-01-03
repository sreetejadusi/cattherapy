"use client";

export default function SunComponent() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#FFF2E3] via-[#FBE3CF] to-[#E7ECFF]" />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-300 h-300 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,210,160,0.45) 0%, rgba(255,210,160,0.25) 35%, rgba(255,210,160,0.12) 55%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 animate-sun left-1/2 top-1/3 w-full h-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full bg-white opacity-[0.18]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-140 rounded-full bg-white opacity-[0.32]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-105 h-105 rounded-full bg-white opacity-[0.48]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 rounded-full bg-white" />
      </div>
    </div>
  );
}
