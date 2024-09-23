import { Template } from "./types";

export const NextJSQuickstart: Template = {
  name: "AI-Native multi-tenant SaaS with Nile and NextJS",
  description:
    "Learn about Nile and AI concepts from a multi-tenant Todo app in NextJS. We go over tenant isolation, RAG architectures and integration with AI models",
  author: "Nile",
  imageSrc: "/templates/AINextJSTodoApp.png",
  demoUrl: "https://nextjs-quickstart-omega.vercel.app/",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/nextjs/README.md",
  metadata: {
    Framework: "NextJS, OpenAI, pg_vector",
    "Use Case": "Building AI Native SaaS",
    Publisher: "Nile",
  },
};

export const NodeJSQuickstart: Template = {
  // A great name, preferably unique, name for the template
  name: "AI-Native multi-tenant SaaS with Nile, NodeJS and React",
  // what the template does
  description:
    "Learn about Nile and AI concepts from an AI-native multi-tenant Todo List app in NodeJS and React",
  // who made it
  author: "Nile",
  // the location of the thumbnail. could be in /public/templates, or a CDN
  imageSrc: "/templates/AINodeJSTodoApp.png",
  demoUrl: "https://demo-todo-node.fly.dev",
  // the readmeURL should be publicly accessible.
  // It should also be the real github url, not the raw readme
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/node_react/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "NodeJS, React, OpenAI, pg_vector",
    "Use Case": "Building AI Native SaaS",
    Publisher: "Nile",
  },
};

export const DrizzleQuickstart: Template = {
  // A great name, preferably unique, name for the template
  name: "AI-Native multi-tenant SaaS with Nile and Drizzle ORM",
  // what the template does
  description:
    "Learn about Nile and AI concepts from an AI-native multi-tenant Todo List app with NodeJS and DrizzleORM",
  // who made it
  author: "Nile",
  demoUrl: "https://nile-drizzle-quickstart.vercel.app/",
  // the location of the thumbnail. could be in /public/templates, or a CDN
  imageSrc: "/templates/DrizzleTodoApp.png",
  // the readmeURL should be publicly accessible.
  // It should also be the real github url, not the raw readme
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/drizzle/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "NodeJS, Drizzle ORM, OpenAI, pg_vector, Express",
    "Use Case": "Building AI Native SaaS",
    Publisher: "Nile",
  },
};

export const LambdaQuickstart: Template = {
  name: "Todo List application backend with Nile and AWS Lambda",
  description:
    "Learn about Nile concepts from a multi-tenant Todo List app in AWS Lambda",
  author: "Nile",
  demoUrl: "https://todo-lambda.vercel.app/",
  imageSrc: "/templates/LambdaTodoApp.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/serverless/lambda-drizzle/README.md",
  metadata: {
    Framework: "AWS Lambda, Serverless, NodeJS, Drizzle ORM, Express",
    "Use Case": "Building SaaS",
    Publisher: "Nile",
  },
};

export const PrismaQuickstart: Template = {
  name: "AI-Native multi-tenant SaaS with Nile and Prisma ORM",
  description:
    "Learn about Nile and AI concepts from an AI-native multi-tenant Todo List app with NodeJS and Prisma ORM",
  author: "Nile",
  demoUrl: "https://todo-prisma-ten.vercel.app/",
  imageSrc: "/templates/PrismaTodoApp.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/prisma/README.md",
  metadata: {
    Framework: "NodeJS, Prisma ORM, OpenAI, pg_vector, Express",
    "Use Case": "Building AI Native SaaS",
    Publisher: "Nile",
  },
};

export const NextAuthQuickstart: Template = {
  name: "Todo List with NextAuth-based Authentication",
  description:
    "Learn how to use Nile with NextAuth to build a multi-tenant app",
  author: "Nile",
  demoUrl: "https://nextauth-demo-delta.vercel.app/",
  imageSrc: "/templates/NextAuthLogin.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/user_management/NextAuth/README.md",
  metadata: {
    Framework: "NextAuth, NextJS, OAuth, Passwordless, Session, JWT",
    "Use Case": "SaaS Authentication",
    Publisher: "Nile",
  },
};

export const StripeSubscriptionsIntegration: Template = {
  name: "SaaS B2B subscription billing with Stripe",
  description:
    "Learn how to use Nile with Stripe to add paid subscriptions to your multi-tenant app",
  author: "Nile",
  demoUrl: "https://niledatabase-stripe-subscription.vercel.app/",
  imageSrc: "/templates/StripeSubscriptions.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/integrations/stripe_subscription/README.md",
  metadata: {
    Framework: "NextJS, Stripe, Stripe subscription, Stripe checkout",
    "Use Case": "SaaS Billing",
    Publisher: "Nile",
  },
};

export const PythonQuickstart: Template = {
  name: "AI-Native SaaS with Nile and Python",
  description:
    "Learn how to use Nile with Python, FastAPI, SQLAlchemy, and OpenAI client to build an AI-Native multi-tenant application",
  author: "Nile",
  demoUrl: "https://nile-python-quickstart.fly.dev/",
  imageSrc: "/templates/AIPythonTodoApp.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/python/README.md",
  metadata: {
    Framework: "Python, FastAPI, SQLAlchemy, React, Vite, OpenAI, pg_vector",
    "Use Case": "Building AI-Native SaaS",
    Publisher: "Nile",
  },
};

export const AIChatWithPDF: Template = {
  name: "KnowledgeAI - PDF search assistant for your organization",
  description:
    "Learn how to use Nile to build multi-tenant SaaS to build a PDF search assistant for your organization",
  author: "Nile",
  demoUrl: "https://ai-pdf-tau.vercel.app/",
  imageSrc: "/templates/ChatWithPDF.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/ai/ai_pdf/README.md",
  metadata: {
    Framework: "OpenAI, pg_vector, UploadThing, NextJS",
    "Use Case": "AI SaaS",
    Publisher: "Shreyas Chaliha aka Trace",
  },
};

export const CodeAssist: Template = {
  name: "Autonomous Code Assistant - Code more, type less",
  description:
    "Learn how to use Nile to build multi-tenant SaaS that helps browse and query new code-bases",
  author: "Nile",
  demoUrl: "https://code-assist-nile.vercel.app/",
  imageSrc: "/templates/CodeAssist.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/ai/code_assist/README.md",
  metadata: {
    Framework: "OpenAI, pg_vector, LangChain, NextJS",
    "Use Case": "AI SaaS",
    Publisher: "Nile",
  },
};

export const SalesInsights: Template = {
  name: "Sales Insights - AI-Native Sales Assistant",
  description:
    "Learn how to use Nile and Modal to build a serverless multi-tenant app that helps analyze sales conversations",
  author: "Nile",
  demoUrl: "https://gwenshap--sales-insight-web-fastapi-app.modal.run/",
  imageSrc: "/templates/SalesInsights.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/ai/sales_insight/README.md",
  metadata: {
    Framework: "Modal, Nile, FastAPI, pgvector, Llama 3.1, Vite",
    "Use Case": "AI SaaS",
    Publisher: "Nile",
  },
};

/*
export const placeholderTemplate: Template = {
  // A great name, preferably unique, name for the template
  name: "Nile js",
  // what the template does
  description: "A placeholder, helping other people create better things.",
  // who made it
  author: "jrea",
  // the location of the thumbnail. could be in /public/templates, or a CDN
  imageSrc: "/templates/nad.jpg",
  // the FQDN for where the demo is running
  demoUrl: "https://demo.demo"
  // the readmeURL should be publicly accessible.
  // It should also be the real github url, not the raw readme
  readmeUrl: "https://github.com/niledatabase/nile-js/blob/main/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "MUI",
    "Use Case": "Building SaaS",
    Publisher: "Nile",
  },
};
*/
