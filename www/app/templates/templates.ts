import { Template } from "./types";

export const placeholderTemplate: Template = {
  // A great name, preferably unique, name for the template
  name: "Nile js",
  // what the template does
  description: "A placeholder, helping other people create better things.",
  // who made it
  author: "jrea",
  // the location of the thumbnail. could be in /public/templates, or a CDN
  imageSrc: "/templates/nad.jpg",
  // the readmeURL should be publically accessible.
  // It should also be the real github url, not the raw readme
  readmeUrl: "https://github.com/niledatabase/nile-js/blob/master/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "MUI",
    "Use Case": "Building SaaS",
    Publisher: "Nile",
  },
};

export const basicAuthNextJsTemplate: Template = {
  name: "Basic Auth in NextJS",
  description:
    "Built on top of NextJS, this implements a secure login example with a sign up page",
  author: "jrea",
  imageSrc: "/templates/BasicAuthNextJs.png",
  readmeUrl:
    "https://github.com/niledatabase/nile-js/blob/master/examples/authentication/README.md",
  metadata: {
    Framework: "NextJS",
    "Use Case": "Authentication - Login and Sign Up",
    Publisher: "Nile",
  },
};
