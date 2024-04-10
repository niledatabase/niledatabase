"use client";

import ReactFlow from "reactflow";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import ELK from "elkjs";
import "reactflow/dist/style.css";
import { PrismTheme } from "prism-react-renderer";

const code = `  
import { ReactFlowProvider } from "reactflow";
// import "reactflow/dist/style.css";

function App() {
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);
  async function layout({ children, edges }) {
    // always do this so it does not clog up every page, but changed for illustrative purposes
    // const ELK = (await import("elkjs")).default; 
    const elk = new ELK();
    return await elk.layout({
      children,
      edges,
      id: "root",
      layoutOptions: {
        algorithm: "layered",
        "spacing.nodeNodeBetweenLayers": "160.0",
        hierarchyHandling: "INCLUDE_CHILDREN",
      },
    });
  }
  React.useEffect(() => {
    (async () => {
      const items = await layout({
        children: [
          { id: "n1", width: 30, height: 30 },
          { id: "n2", width: 30, height: 30 },
          { id: "n3", width: 30, height: 30 },
        ],
        edges: [
          { id: "e1", sources: ["n1"], targets: ["n2"] },
          { id: "e2", sources: ["n1"], targets: ["n3"] },
        ],
      }).catch(console.error);
      setNodes(
        items.children.map((child) => ({
          ...child,
          data: {
            label: child.id
          },
          position: { x: child.x, y: child.y },
          sourcePosition: 'right',
          targetPosition: 'left',
        }))
      );
      setEdges(items.edges.map((edge)=>({
        ...edge,
        source: edge.sources[0],
        target: edge.targets[0],
      })))
    })();
  }, []);
  return <ReactFlow nodes={nodes} edges={edges} />;
}

`;
function Button() {
  return <button>garbage</button>;
}
const scope = {
  Button,
  ReactFlow,
  initialNodes: [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ],
  initialEdges: [{ id: "e1-2", source: "1", target: "2" }],
  ELK,
};
export default function DataFlow() {
  return (
    <div className="flex flex-col w-full rounded-md overflow-hidden font-mono">
      <LiveProvider code={code} scope={scope} theme={theme}>
        <div className="live-preview">
          <LivePreview />
        </div>
        <LiveError />
        <LiveEditor code={code} />
      </LiveProvider>
    </div>
  );
}
const theme: PrismTheme = {
  plain: {
    color: "#79c0ff",
    backgroundColor: "#000",
  },
  styles: [
    {
      types: ["prolog", "constant", "builtin"],
      style: {
        color: "rgb(189, 147, 249)",
      },
    },
    {
      types: ["inserted", "function"],
      style: {
        color: "#d2a8ff",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "rgb(255, 85, 85)",
      },
    },
    {
      types: ["changed"],
      style: {
        color: "rgb(255, 184, 108)",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "rgb(248, 248, 242)",
      },
    },
    {
      types: ["string", "char", "tag", "selector"],
      style: {
        color: "#a5d6ff",
      },
    },
    {
      types: ["keyword", "variable", "console"],
      style: {
        color: "#ff7b72",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(98, 114, 164)",
      },
    },
    {
      types: ["attr-name", "plain"],
      style: {
        color: "#79c0ff",
      },
    },
  ],
};
