import {configureNile} from '@/lib/NileServer'
import { cookies } from 'next/headers';
import styles from '../page.module.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import { indexPDF } from '@/lib/indexer';
import { revalidatePath } from 'next/cache'



// Forcing to re-evaluate each time. 
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'


async function indexPDFAction(formData: FormData) {
    'use server'
 
    const rawFormData = {
      tenantId: formData.get('tenantId')?.toString(),
      url: formData.get('pdfURL')?.toString(),
    }

    if (!rawFormData.tenantId || !rawFormData.url) {
        throw new Error("Missing tenantId or url");
    }

    console.log("indexing pdf: " + rawFormData.url + " for tenant: " + rawFormData.tenantId);

    await indexPDF(rawFormData.tenantId, rawFormData.url);

    revalidatePath('/indexer')
}

export default async function Page() {

  const nile = configureNile(cookies().get('authData'), undefined); 
  console.log("showing tenants page for user: " + nile.userId);
  let tenants:any = [];
  
  if (nile.userId) {
    // TODO: Replace with API call to get tenants for user when the SDK supports this
    tenants = await nile.db.query(`select tenants.id, tenants.name 
      from tenants join users.tenant_users on tenants.id = tenant_users.tenant_id
       where tenant_users.user_id = $1`, [nile.userId]);
  };

  const tenantDB = configureNile(cookies().get('authData'), tenants[0].id);

  const fileSummary = await tenantDB.db.query("select * from files order by created_at desc");

  return (
    <div className={styles.center}>
         {/* TODO: Do we want a title with user or tenant name?*/}
     <Stack spacing={3} sx={{ maxWidth: '50%' }}>
      <Card  variant="outlined" > 
      <CardContent > 
        <div style={{display: 'flex', justifyContent: 'center', padding:'1rem'}}>
            <form name="newtenant" id="newtenant" action={indexPDFAction}> 
            <Stack spacing={3} >
                    <Typography level="title-lg">Please provide a URL of a PDF</Typography>
                    <Typography level="body-md" >We are going to chunk the document, generate embeddings and store them. 
                    You will see, in the table below how long it took to generate and store embeddings.
                    For efficiency and cost reasons, we are going to only index the first 10,000 characters of the document </Typography>

                    <Typography level="body-md" >For example, you can try this short article about Phil Jackson: https://uhra.herts.ac.uk/bitstream/handle/2299/1346/900740.pdf
                    </Typography>
                    <Input id="pdfURL" name="pdfURL" autoFocus required />
                    <input type="hidden" id="tenantId" name="tenantId" value={tenants[0].id} />
                    <Button type="submit" variant="solid">Submit</Button>
            </Stack>
        </form>
        </div>
      </CardContent>
      </Card>
      <Card>
      <Table>
      <thead>
        <tr>
            <th>File URL</th>
            <th># Pages</th>
            <th>Time to index (ms)</th>
            <th>Start of document</th>
        </tr>
        </thead>
        <tbody>
            {fileSummary
            .rows
            .filter(v => v.first_paragraph !== null)
            .map((file: any) => (
                <tr key={file.id}>
                    <td>{file.url.substring(0,30)}</td>
                    <td>{file.pages}</td>
                    <td>{file.time_to_index}</td>
                    <td>{file.first_paragraph.substring(0,160)}</td>
                </tr>
            ))}
        </tbody>
      </Table>
      </Card>
      </Stack>
      </div>
      )
}