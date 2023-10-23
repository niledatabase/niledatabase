import type { MDXComponents } from "mdx/types";
import Cards, { Card } from "./app/docs/_components/Cards";
import CodeGroups from "./app/docs/_components/CodeGroups";
import { Col, Row } from "./app/docs/_components/Layout";
import Head from "next/head";
import Image from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
    Card: (props) => <Card {...props} />,
    Cards: (props) => <Cards {...props} />,
    CodeGroups: (props) => <CodeGroups {...props} />,
    Col: (props) => <Col {...props} />,
    Row: (props) => <Row {...props} />,
    head: ({ children }) => <Head>{children}</Head>,
    Image: (props) => <Image {...props} />,
  };
};
