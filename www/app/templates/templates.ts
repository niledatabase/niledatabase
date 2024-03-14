import { Template } from "./types";

export const NextJSQuickstart: Template = {
  name: "NextJS multi-tenant application with Nile",
  description:
    "Learn about Nile concepts from a Todo multi-tenant app in NextJS",
  author: "Nile",
  imageSrc: "/templates/NextJSTodoApp.png",
  demoUrl: "https://nextjs-quickstart-omega.vercel.app/",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/nextjs/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "NextJS 13",
    "Use Case": "Building SaaS",
    Publisher: "Nile",
  },
};

export const EmailLogin: Template = {
  name: "Email Login Example for multi-tenant application",
  description:
    "Learn about simple Authentication for multi-tenant application with Nile",
  author: "Nile",
  imageSrc: "/templates/EmailLogin.png",
  demoUrl: "https://email-authn.vercel.app/",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/user_management/email_login/NextJS/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "NextJS 13",
    "Use Case": "SaaS Authentication",
    Publisher: "Nile",
  },
};

export const SocialLoginGoogle: Template = {
  name: "Social Login for multi-tenant application with Google",
  description:
    "Build social login for multi-tenant application with Google and Nile",
  author: "Nile",
  imageSrc: "/templates/GoogleSocialLogin.png",
  demoUrl: "https://niledatabase-google-sso.vercel.app",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/user_management/social_login_google/NextJS/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "NextJS 13",
    "Use Case": "SaaS Authentication, Social Login",
    Publisher: "Nile",
  },
};

export const OktaSSOLogin: Template = {
  name: "SSO Login for multi-tenant application with Okta",
  description:
    "Build multi-tenant application using enterprise SSO login with Okta and Nile",
  author: "Nile",
  imageSrc: "/templates/OktaSSOLogin.png",
  demoUrl: "https://login-okta-demo.vercel.app/",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/user_management/sso_login_okta/NextJS/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "NextJS 13",
    "Use Case": "SaaS Authentication, Enterprise SSO",
    Publisher: "Nile",
  },
};

export const NodeJSQuickstart: Template = {
  // A great name, preferably unique, name for the template
  name: "NodeJS multi-tenant application with Nile",
  // what the template does
  description:
    "Learn about Nile concepts from a multi-tenant Todo List app in NodeJS",
  // who made it
  author: "Nile",
  // the location of the thumbnail. could be in /public/templates, or a CDN
  imageSrc: "/templates/NodeTodoApp.png",
  demoUrl: "https://demo-todo-node.fly.dev",
  // the readmeURL should be publicly accessible.
  // It should also be the real github url, not the raw readme
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/node_react/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "NodeJS",
    "Use Case": "Building SaaS",
    Publisher: "Nile",
  },
};

export const JavaQuickstart: Template = {
  // A great name, preferably unique, name for the template
  name: "Java multi-tenant application with Nile",
  // what the template does
  description:
    "Learn about Nile concepts from a multi-tenant Todo List app in Java",
  // who made it
  author: "Nile",
  demoUrl: "https://java-quickstart-demo.vercel.app/",
  // the location of the thumbnail. could be in /public/templates, or a CDN
  imageSrc: "/templates/JavaTodoApp.png",
  // the readmeURL should be publicly accessible.
  // It should also be the real github url, not the raw readme
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/java/README.md",
  // A key/value string/string. What is put here will show up on the site exactly
  metadata: {
    Framework: "Java, Spring Boot 3, Hibernate",
    "Use Case": "Building SaaS",
    Publisher: "Nile",
  },
};

export const DrizzleQuickstart: Template = {
  // A great name, preferably unique, name for the template
  name: "Drizzle multi-tenant application with Nile",
  // what the template does
  description:
    "Learn about Nile concepts from a multi-tenant Todo List app in Drizzle",
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
    Framework: "NodeJS, Drizzle ORM, Express",
    "Use Case": "Building SaaS",
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
  name: "Todo List application backend with Nile and Prisma ORM",
  description:
    "Learn how to use Nile with Prisma ORM to build a multi-tenant app",
  author: "Nile",
  demoUrl: "https://todo-prisma-ten.vercel.app/",
  imageSrc: "/templates/PrismaTodoApp.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/prisma/README.md",
  metadata: {
    Framework: "NodeJS, Prisma ORM, Express",
    "Use Case": "Building SaaS",
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
  name: "Multi-tenant Todo List application with Python and Nile",
  description:
    "Learn how to use Nile with Python, FastAPI, SQLAlchemy, React, Vite and Nile's Serverless Postgres to build a multi-tenant app",
  author: "Nile",
  demoUrl: "https://nile-python-quickstart.fly.dev/",
  imageSrc: "/templates/PythonQuickstart.png",
  readmeUrl:
    "https://github.com/niledatabase/niledatabase/blob/main/examples/quickstart/python/README.md",
  metadata: {
    Framework: "Python, FastAPI, SQLAlchemy, React, Vite",
    "Use Case": "Building SaaS",
    Publisher: "Nile",
  },
};

export const AIChatWithPDF: Template = {
  name: "Multi-tenant chat with PDF application using Nile, pg_vector and OpenAI",
  description:
    "Learn how to use Nile as a multi-tenant vector database with OpenAI to build a chat with PDF application",
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
