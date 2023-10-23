
import { setNile, getNile } from "@/lib/NileServer"
import Server from "@niledatabase/server"


//@ts-ignore // TODO: declare types for the props (and consider moving this to nile SDK)
export default function NileServer({ children, tenantId, userId, userToken}) {
    const server = Server({
        workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
        database: String(process.env.NEXT_PUBLIC_DATABASE),
        api: {
          basePath: String(process.env.NEXT_PUBLIC_NILE_API),
        },
        db: {
          connection: {
            host: process.env.NILE_DB_HOST,
            user: process.env.NILE_USER,
            password: process.env.NILE_PASSWORD,
          },
        },
      })
    server.tenantId = tenantId;
    server.userId = userId;
    server.token = userToken;

    setNile(server)
    console.log("done setting nile server")
    console.log("tenant: " + getNile().tenantId + " user: " + getNile().userId)
    return (
        <div>
            {children}
        </div>
    )
  }
