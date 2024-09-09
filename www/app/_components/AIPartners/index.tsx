const partners = [
  {
    title: "TaskPilot AI",
    icon: "🥇",
    description: "Your AI-Driven Guide to Seamless Task Management",
  },
  {
    title: "Slack++",
    icon: "💬",
    description: "Built with AI to power work",
  },
  {
    title: "AITravelMate",
    icon: "🧳",
    description: "Your business trips managed by AI",
  },
  {
    title: "SmartSpend AsI",
    icon: "💸",
    description: "Set teams free from manual expenses",
  },
  {
    title: "SmartSpend fAI",
    icon: "💸",
    description: "Set teams free from manual expenses",
  },
  {
    title: "SmartSpend AgI",
    icon: "💸",
    description: "Set teams free from manual expenses",
  },
  {
    title: "SmartSpend AdI",
    icon: "💸",
    description: "Set teams free from manual expenses",
  },
  {
    title: "SmartSpend AtI",
    icon: "💸",
    description: "Set teams free from manual expenses",
  },
];
export default function AIPartners() {
  return (
    <div className="container mx-auto">
      <div className="pt-48 flex flex-col gap-6">
        <div>
          <div className="text-[32px] leading-[32px] text-center">
            Integrates with our
          </div>
          <div className="text-[32px] leading-[32px] text-center">
            numerous AI partners
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-4 gap-4">
            {partners.map((partner) => {
              return (
                <div
                  key={partner.title}
                  className="bg-darkGray rounded-lg max-w-[147px] max-h-[147px] flex justify-center items-center  text-[72px] leading-[72px] lg:text-[96px] lg:leading-[96px]"
                >
                  {partner.icon}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
