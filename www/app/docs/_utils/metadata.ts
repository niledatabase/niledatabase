import { ResolvingMetadata, Metadata } from "next";
import findDocFile, { FileMetadata } from "./findDocFile";
import { NavigationRoots } from "../_components/SideNavigation";
import { Param } from "../_components/PageContent/types";
export default function metadataText(items: string | string[]) {
  let texts: string[];
  if (!Array.isArray(items)) {
    texts = [items];
  } else {
    texts = items;
  }
  return texts.concat("Nile database").join(" | ");
}

type Props = { params: Param };

export const buildMetadata = (
  metadata: FileMetadata & Metadata,
  root: NavigationRoots,
  props: Props
): Metadata => {
  return {
    ...metadata,
    title: metadataText(metadata?.title),
    description: metadata?.description,
    alternates: {
      canonical: `/docs/${root}${
        props.params.slug ? `/${props.params.slug.join("/")}` : ""
      }`,
    },
  };
};

export const makeMetadata = (root: NavigationRoots) =>
  async function generateMetadata(
    props: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const { metadata } = await findDocFile({
      ...props,
      root,
    });

    const previousImages = (await parent).openGraph?.images || [];
    const baseMetadata = buildMetadata(metadata, root, props);
    const [img] = previousImages;
    if (img && typeof img === "object" && "url" in img && metadata.image) {
      const url = new URL(img.url);
      console.log(url);
      const image = new URL(`${url.origin}${metadata.image}`);
      baseMetadata.openGraph = {
        images: [image],
      };
      baseMetadata.twitter = {
        card: "summary_large_image",
        site: "@niledatabase",
        creator: "@niledatabase",
        images: image,
      };
    } else {
      baseMetadata.openGraph = {
        images: [...previousImages],
      };
    }
    if (metadata.tags) {
      baseMetadata.keywords = metadata.tags;
    }

    return baseMetadata;
  };
