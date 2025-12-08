'use client';

export default function VideoEmbed() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full rounded-lg object-contain"
      >
        <source src="/video/counteruser.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
