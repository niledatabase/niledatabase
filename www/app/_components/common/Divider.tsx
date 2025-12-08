const base = 'h-16 w-full mt-32 container mx-auto -z-[2000]';
const variants = {
  flip: `${base} rotate-180`,
};
export default function Divider({ flip }: { flip?: boolean }) {
  let classes = base;
  if (flip) {
    classes = variants.flip;
  }
  return (
    <div className="container mx-auto">
      <div className="pb-0 md:px-4 md:py-4 2xl:px-24 2xl:py-4">
        <div className={classes}>
          <div className="relative h-[99%] overflow-hidden">
            <div className="bgDivider absolute bottom-0 left-0 right-0 top-0 h-16"></div>
            <div className="left-30 right-30 absolute bottom-[40px] top-0 w-full bg-divider-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
