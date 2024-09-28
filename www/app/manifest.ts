import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Postgres rengineered for multitenant and AI apps",
    short_name: "Nile Postgres",
    description:
      "Postgres reengineered for multitenant apps. Build secure, scalable and AI-native multi-tenant applications with world-class developer experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
