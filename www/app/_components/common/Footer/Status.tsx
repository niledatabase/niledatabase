import Link from "next/link";

type Statuses =
  | "UP"
  | "HASISSUES"
  | "ALLUNDERMAINTENANCE"
  | "ALLDEGRADEDPERFORMANCE"
  | "ALLPARTIALOUTAGE"
  | "ALLMINOROUTAGE"
  | "ALLMAJOROUTAGE"
  | "SOMEUNDERMAINTENANCE"
  | "SOMEDEGRADEDPERFORMANCE"
  | "SOMEPARTIALOUTAGE"
  | "SOMEMINOROUTAGE"
  | "SOMEMAJOROUTAGE"
  | "ONEUNDERMAINTENANCE"
  | "ONEDEGRADEDPERFORMANCE"
  | "ONEPARTIALOUTAGE"
  | "ONEMINOROUTAGE"
  | "ONEMAJOROUTAGE";

function getColor(status: Statuses) {
  switch (status) {
    case "ALLUNDERMAINTENANCE":
    case "SOMEUNDERMAINTENANCE":
    case "ONEUNDERMAINTENANCE":
      return "info";
    case "ALLMAJOROUTAGE":
    case "ALLPARTIALOUTAGE":
    case "SOMEMAJOROUTAGE":
      return "error";
    case "SOMEPARTIALOUTAGE":
    case "HASISSUES":
    case "ALLDEGRADEDPERFORMANCE":
    case "SOMEDEGRADEDPERFORMANCE":
    case "SOMEPARTIALOUTAGE":
    case "SOMEMINOROUTAGE":
    case "ONEDEGRADEDPERFORMANCE":
    case "ONEPARTIALOUTAGE":
    case "ONEMINOROUTAGE":
    case "ONEMAJOROUTAGE":
      return "warning";
    case "UP":
      return "success";
    default:
      return "success";
  }
}

function getText(status: Statuses) {
  switch (status) {
    case "UP":
      return "All Systems Operational";
    case "ALLMAJOROUTAGE":
      return "System Failure";
    case "SOMEPARTIALOUTAGE":
      return "Degraded";
  }
}
const variants = {
  success: `bg-success w-2 h-2 rounded-md`,
  error: `bg-error w-2 h-2 rounded-md`,
  warning: `bg-warning w-2 h-2 rounded-md`,
  info: "bg-info w2 h-2 rounded-md",
};

export default async function Status() {
  const headers = new Headers({
    Authorization: `Bearer: ${process.env.INSTATUS_API_KEY}`,
  });
  const res = await fetch("https://api.instatus.com/v2/pages", {
    headers,
  }).catch((e) => {
    // do something
  });
  if (!res) {
    return null;
  }
  const body = await new Response(res.body).json();
  if (!Array.isArray(body)) {
    return null;
  }
  const [page] = body;
  const { status } = page;
  const color = getColor(status);
  const text = getText(status);

  return (
    <div className="mt-40 flex flex-row gap-4 items-center pb-10">
      {color && <div className={variants[color]}></div>}
      <div className="text-[#A1A1AA]">
        <Link href="https://nile.instatus.com/" target="_blank">
          {text} <span className="text-lg">↗</span>
        </Link>
      </div>
    </div>
  );
}
