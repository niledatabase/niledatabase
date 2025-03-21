import react from "react";
export default function ChartHover() {
  return (
    <div className="absolute w-0 z-10 top-[64px] lg:top-[166px]">
      <div
        className="absolute "
        style={{ transform: "translate(84px, 142px)" }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="w-[20px] sm:w-[48px] xl:w-[70px] 2xl:w-[82px] chart hover:before:opacity-100 h-[80px] gradientborder180 border transition-all"></div>
          <div>May</div>
        </div>
      </div>
      <div
        className="absolute -ml-[20px] md:ml-0 xl:ml-[20px] 2xl:ml-[40px]"
        style={{ transform: "translate(144px, 176px)" }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="w-[20px] sm:w-[48px] xl:w-[70px] 2xl:w-[82px] chart hover:before:opacity-100 h-[46px] gradientborder180 border"></div>
          <div>June</div>
        </div>
      </div>
      <div
        className="absolute -ml-[40px]  md:ml-0 xl:ml-[40px] 2xl:ml-[80px]"
        style={{ transform: "translate(204px, 120px)" }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="w-[20px] sm:w-[48px] xl:w-[70px] 2xl:w-[82px] chart hover:before:opacity-100 h-[102px] gradientborder180 border"></div>
          <div>July</div>
        </div>
      </div>
      <div
        className="absolute -ml-[60px]  md:ml-[0px] xl:ml-[60px] 2xl:ml-[120px]"
        style={{ transform: "translate(264px, 192px)" }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="w-[20px] sm:w-[48px] xl:w-[70px] 2xl:w-[82px] chart hover:before:opacity-100 h-[30px] gradientborder180 border"></div>
          <div>Aug</div>
        </div>
      </div>
      <div
        className="absolute -ml-[80px] md:ml-0 xl:ml-[80px] 2xl:ml-[160px]"
        style={{ transform: "translate(324px, 166px)" }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="w-[20px] sm:w-[48px] xl:w-[70px] 2xl:w-[82px] chart hover:before:opacity-100 h-[56px] gradientborder180 border"></div>
          <div>Sep</div>
        </div>
      </div>
      <div
        className="absolute -ml-[100px] md:ml-0 xl:ml-[100px] 2xl:ml-[200px]"
        style={{ transform: "translate(384px, 162px)" }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="w-[20px] sm:w-[48px] xl:w-[70px] 2xl:w-[82px] chart hover:before:opacity-100 h-[60px] gradientborder180 border"></div>
          <div>Oct</div>
        </div>
      </div>
    </div>
  );
}
