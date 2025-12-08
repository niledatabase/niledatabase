import react from 'react';
export default function ChartHover() {
  return (
    <div className="absolute top-[64px] z-10 w-0 lg:top-[166px]">
      <div className="absolute" style={{ transform: 'translate(84px, 142px)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="chart gradientborder180 h-[80px] w-[20px] border transition-all hover:before:opacity-100 sm:w-[48px] xl:w-[70px] 2xl:w-[82px]"></div>
          <div>May</div>
        </div>
      </div>
      <div
        className="absolute -ml-[20px] md:ml-0 xl:ml-[20px] 2xl:ml-[40px]"
        style={{ transform: 'translate(144px, 176px)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="chart gradientborder180 h-[46px] w-[20px] border hover:before:opacity-100 sm:w-[48px] xl:w-[70px] 2xl:w-[82px]"></div>
          <div>June</div>
        </div>
      </div>
      <div
        className="absolute -ml-[40px] md:ml-0 xl:ml-[40px] 2xl:ml-[80px]"
        style={{ transform: 'translate(204px, 120px)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="chart gradientborder180 h-[102px] w-[20px] border hover:before:opacity-100 sm:w-[48px] xl:w-[70px] 2xl:w-[82px]"></div>
          <div>July</div>
        </div>
      </div>
      <div
        className="absolute -ml-[60px] md:ml-[0px] xl:ml-[60px] 2xl:ml-[120px]"
        style={{ transform: 'translate(264px, 192px)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="chart gradientborder180 h-[30px] w-[20px] border hover:before:opacity-100 sm:w-[48px] xl:w-[70px] 2xl:w-[82px]"></div>
          <div>Aug</div>
        </div>
      </div>
      <div
        className="absolute -ml-[80px] md:ml-0 xl:ml-[80px] 2xl:ml-[160px]"
        style={{ transform: 'translate(324px, 166px)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="chart gradientborder180 h-[56px] w-[20px] border hover:before:opacity-100 sm:w-[48px] xl:w-[70px] 2xl:w-[82px]"></div>
          <div>Sep</div>
        </div>
      </div>
      <div
        className="absolute -ml-[100px] md:ml-0 xl:ml-[100px] 2xl:ml-[200px]"
        style={{ transform: 'translate(384px, 162px)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="chart gradientborder180 h-[60px] w-[20px] border hover:before:opacity-100 sm:w-[48px] xl:w-[70px] 2xl:w-[82px]"></div>
          <div>Oct</div>
        </div>
      </div>
    </div>
  );
}
