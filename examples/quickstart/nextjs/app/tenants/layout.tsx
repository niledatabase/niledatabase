import NileServer from "@/components/NileServer"
import { getUserToken, getUserId } from "@/utils/AuthUtils";
import { cookies } from 'next/headers';



export default function TenantLayout({
    children, params,
  }: {
    children: React.ReactNode,
    params: {
      tenantid: string
    }
  }) {
    console.log('running tenant layout')
    const tenantId = params.tenantid
    const token = getUserToken(cookies().get('authData'))
    const userId = getUserId(cookies().get('authData')) 
    return (
      <NileServer tenantId={tenantId} userId={userId} userToken={token}>
        {children}
        </NileServer>
    )
  }