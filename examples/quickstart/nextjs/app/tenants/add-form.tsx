'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { getNile } from '@/lib/NileServer';

export async function AddForm() {
    async function createTenant(prevState: any, formData: FormData) {
        'use server'
        const nile = getNile(); 
        const tenantName = formData.get('tenantname')?.toString();
        if (!tenantName) {
            return { message: 'No tenant name provided' }
        };
    
        console.log("creating tenant " + tenantName + " for user:" + nile.userId);
    
        let success = false; // needed because redirect can't be used in try-catch block
        let tenantID = null;
        try {
    
          const createTenantResponse = await nile.api.tenants.createTenant({
            name: tenantName,
          });
          const tenant = await createTenantResponse.json();
          tenantID = tenant.id;
          console.log('tenantID', tenantID);
          revalidatePath('/tenants')
          success = true;
        } catch (e) {
            console.error(e)
            return { message: 'Failed to create tenant' }
        }
        if (success && tenantID) {
            redirect(`/tenants/${tenantID}/todos`) // Navigate to new route
        }
      }

    return (
        <form name="newtenant" id="newtenant" action={createTenant}> 
        <Stack spacing={3}>
                <Typography>Name</Typography>
                <Input id="tenantname" name="tenantname" autoFocus required />
                <Button type="submit" variant="solid">Submit</Button>
        </Stack>
        </form>
    )


}