import React from "react";
import "@fontsource/inter";
import "./css/globals.css";
import "./css/output.css";
import { ReactComponent as NodeLogoRight } from "./images/node_logo_r.svg";
import { ReactComponent as NodeLogoBottom } from "./images/node_logo_b.svg";
import Logo from "./components/ui/logo";
import { Card } from "./components/ui/card";

export default function Layout({ children }) {
  return (
    <main className="h-screen flex items-center flex-col">
      <div className="bg-black border-b-px flex flex-row justify-between w-full items-center px-6 py-4">
        <NodeLogoRight width="133.5px" height="82px" />
        <div className="text-3xl p-10 text-white">
          TaskGenius - Task manager with ai-based estimates
        </div>

        <a
          href="https://thenile.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          Created by
          <Logo width="100px" height="37px" style={{ marginLeft: "15px" }} />
        </a>
        {window.location.pathname === "/" ? null : (
          <div>
            <span>[</span>
            <a href="/?logout" style={{ color: "black" }}>
              Logout
            </a>
            <span>]</span>
          </div>
        )}
      </div>

      <div className="container mx-auto">{children}</div>
      <div className="flex flex-row justify-between p-8 gap-8">
        <Card>
          <a
            href="https://www.thenile.dev/docs/getting-started/languages/node"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NodeLogoBottom className="h-10" />
          </a>
          Getting started guide
        </Card>
        <Card>
          <a
            href="https://console.thenile.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo fill="black" className="h-10" />
          </a>
          <div>Sign up to Nile</div>
        </Card>

        <Card>
          <a
            href="https://www.thenile.dev/templates"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo fill="black" className="h-10" />
          </a>
          <div>Try additional templates</div>
        </Card>
      </div>
    </main>
  );
}
