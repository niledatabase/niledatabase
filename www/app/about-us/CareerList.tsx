import { glob } from "glob";
import { processFile } from "../careers/processFile.mjs";
import { OpenPositionMetadata } from "./OpenPositionMetadata";
import CareerPost from "./CareerPost";
import CareerHeader from "./CareerHeader";

export default async function CareerList() {
  const files = await glob(`app/careers/**.mdx`, { nodir: true });
  const postings = files.map(async (file): Promise<OpenPositionMetadata> => {
    // import does not work here
    const { metadata } = await processFile(file);
    const slug = file.replace("app", "..").replace(".mdx", "");
    return { ...metadata, slug } as unknown as OpenPositionMetadata;
  });
  const openPositions = await Promise.all(postings);

  return (
    <>
      <CareerHeader />
      <div className="container mx-auto flex justify-center gap-3 mt-10 flex-col items-center">
        {openPositions.map((position) => {
          return (
            <div key={position.header} className="w-2/3">
              <CareerPost {...position} />
            </div>
          );
        })}
      </div>
    </>
  );
}
