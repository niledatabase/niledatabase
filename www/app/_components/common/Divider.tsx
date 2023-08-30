export default function Divider() {
  return (
    <div className="relative h-16 w-full mt-32 container mx-auto">
      <div className="absolute top-0 left-0 right-0, bottom-0 bgDivider h-16"></div>
      <div className="absolute top-0 left-30 right-30 bottom-0 bg-divider-glow w-full"></div>
    </div>
  );
}
