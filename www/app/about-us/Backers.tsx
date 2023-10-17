import Image from "next/image";
import Heading from "../_components/common/Heading";
import { sizes } from "../_components/common/sizes";

const investors = [
  {
    name: "SV Angel",
    title: "Investment Fund",
    imgSrc: "sv-angel.png",
  },
  {
    name: "Elad Gil",
    title: "Investor",
    imgSrc: "elad-gil.png",
  },
  {
    name: "Jay Kreps",
    title: "CEO, Confluent",
    imgSrc: "jay-kreps.png",
  },
  {
    name: "Dylan Field",
    title: "Founder of Figma",
    imgSrc: "dylan-field.png",
  },
  {
    name: "Neha Narkhede",
    title: "Co-founder, Confluent",
    imgSrc: "neha-narkhede.png",
  },
  {
    name: "Akshay Kothari",
    title: "COO Notion",
    imgSrc: "akshay-kothari.png",
  },
  {
    name: "Erica Ruliffson Schultz",
    title: "President, Field Operations at Confluent",
    imgSrc: "erica-ruliffson-schultz.png",
  },
  {
    name: "Ganesh Srinivasan",
    title: "Ex CPO Confluent",
    imgSrc: "ganesh-srinivasan.png",
  },
  {
    name: "Tim Howes",
    title: "Ex Engineering Director, Facebook AI",
    imgSrc: "tim-howes.png",
  },
  {
    name: "Chris Riccomini",
    title: "Investor",
    imgSrc: "chris-riccomini.png",
  },
  {
    name: "Kishore Gopalakrishna",
    title: "CEO, StarTree",
    imgSrc: "kishore-gopalakrishna.png",
  },
  {
    name: "Chrix Finne",
    title: "Investor",
    imgSrc: "chrix-finne.png",
  },
  {
    name: "Josh Wills",
    title: "Investor",
    imgSrc: "josh-wills.png",
  },
  {
    name: "Srikrishnan Ganesan",
    title: "CEO, Rocketlane",
    imgSrc: "srikrishnan-ganesan.png",
  },
  {
    name: "Corey Quinn",
    title: "Chief Cloud Economist, Duckbill group",
    imgSrc: "corey-quinn.png",
  },
  {
    name: "Ilan Rabinovitch",
    title: "Ex SVP of product, Datadog",
    imgSrc: "ilan-rabinovitch.png",
  },
];
export default function Backers() {
  const firstHalf = investors.slice(0, investors.length / 2);
  const secondHalf = investors.slice(firstHalf.length + 1, investors.length);
  console.log(firstHalf, secondHalf);
  return (
    <div className="flex flex-col gap-24 items-center">
      <Heading text="Backed by amazing people" />
      <Image
        width={296}
        height={296}
        src="benchmark.svg"
        alt="benchmark logo"
      />
      <div className="w-screen lg:w-auto overflow-y-scroll relative z-10 px-4">
        <div className="flex flex-row lg:flex-wrap">
          {firstHalf.map(({ name, title, imgSrc }) => {
            return (
              <div
                key={name}
                className="flex flex-row gap-2 lg:w-1/4 w-1/2 mb-12 shrink-0"
              >
                <Image
                  className="rounded-full flex-shrink-0 w-[56px] h-[56px]"
                  width={56}
                  height={56}
                  alt={name}
                  src={`/profiles/${imgSrc}`}
                />
                <div className="flex flex-col">
                  <div>{name}</div>
                  <div className="opacity-60 max-w-[160px]">{title}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row lg:flex-wrap">
          {secondHalf.map(({ name, title, imgSrc }) => {
            return (
              <div
                key={name}
                className="flex flex-row gap-2 lg:w-1/4 w-1/2 mb-12 shrink-0"
              >
                <Image
                  className="rounded-full flex-shrink-0 w-[56px] h-[56px]"
                  width={56}
                  height={56}
                  alt={name}
                  src={`/profiles/${imgSrc}`}
                />
                <div className="flex flex-col">
                  <div>{name}</div>
                  <div className="opacity-60 max-w-[160px]">{title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
