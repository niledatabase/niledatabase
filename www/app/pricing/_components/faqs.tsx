import Link from "next/link";

export default [
  {
    header: "How does billing work?",
    content: (
      <>
        Nile is billed on query tokens for usage on serverless compute and 
        on storage. In the near future, you will be billed on 
        provisioned compute (coming soon) if you choose to use it 
        for some of your tenants/customers. You get billed on the first of
        every month for the usage consumed. All billing happens at the workspace level.
      </>
    ),
  },
  {
    header: "Are the limits per workspace?",
    content: (
      <>
        Yes, most limits are per workspace. This enables us to provide unlimited DBs for free tier
        and you can decide how to distributed the total available limits across the DBs.
      </>
    ),
  },
  {
    header: "What happens when I hit the limits of a tier?",
    content: (
      <>
        We will reach out to you when you are nearing your usage limits. You can typically pay for 
        additional capacity without having to move to a higher tier. This is true even when you 
        are on the free tier.
      </>
    ),
  },
  {
    header: "Do I get notified if I am reaching my usage limits?",
    content: (
      <>
        Yes, you will be notified when you are close to 70% of the limits for your current tier.
        Note that 
      </>
    ),
  },
  {
    header: "How is your cost so low for serverless compute?",
    content: (
      <>
       Nile's serverless compute is truly multi-tenant. This enables us to provide the ability to charge for
       the exact cpu and memory utilized per query. This reduces the cost on an average by 10x over provisioned 
       compute. We take care of providing isolation across tenants.You can place tenants on the serverless
       compute or provisioned compute (coming soon).
      </>
    ),
  },
  {
    header: "Does my db pause in the free tier?",
    content: (
      <>
       No, the db never pauses. We don't have any cold start time on the free tier. This is because we have
       built our serverless compute to be multitenant that lets us provide 'always on' dbs for free tier users. 
      </>
    ),
  },
];
