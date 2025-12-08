import type { MDXComponents } from 'mdx/types';
import Video from './app/_components/Video';
import Image from 'next/image';
import DataFlows from './app/blog/_components/data-flows';
import { Col, Row } from './app/_components/common/Layout';
import CopyToClipboard from './app/_components/common/CopyToClipboard';

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
    Col: (props) => <Col {...props} />,
    Row: (props) => <Row {...props} />,
    Image: (props) => <Image {...props} alt={props.alt ?? props.src} />,
    pre: ({ children }) => (
      <CopyToClipboard>{children as JSX.Element}</CopyToClipboard>
    ),
    Video: (props) => <Video {...props} baseSrc="" />,
    DataFlows: (props) => <DataFlows {...props} />,
  };
};
