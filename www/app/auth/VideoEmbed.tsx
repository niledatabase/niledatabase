"use client";

export default function VideoEmbed() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain rounded-lg"
      >
        <source src="/video/counteruser.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
