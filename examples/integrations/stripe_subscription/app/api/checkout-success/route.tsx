import { cookies } from 'next/headers';
import Stripe from 'stripe';
import {configureNile} from '@/lib/NileServer'
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
    console.log("checkout-success called");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    const searchParams = req.nextUrl.searchParams
    const tenantId = searchParams.get('tenant_id')?.toString()
    const session_id = searchParams.get('session_id')?.toString()

    if (!tenantId || !session_id) {
        console.log("missing tenant_id or session_id parameters from request");
        redirect(process.env.NEXT_PUBLIC_BASE_PATH || '/'); // TODO: Better error handling
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    const customerId= checkoutSession.customer;

    if (!customerId) {
        console.log("missing customer_id from checkout session " + JSON.stringify(checkoutSession, null, 2));
        redirect(process.env.NEXT_PUBLIC_BASE_PATH || '/'); // TODO: Better error handling
    }

    // Here we are getting a connection to a specific tenant database 
    const tenantNile = configureNile(cookies().get('authData'), tenantId);

    // Store the Stripe customer ID  and subscription in the database
    const resp = await tenantNile.db("tenants").update({
        stripe_customer_id: checkoutSession.customer, 
        stripe_subscription_id: checkoutSession.subscription,
        tenant_tier: "basic"});
    
    revalidatePath('/tenants')
    redirect('/tenants/'+tenantId+'/billing');
}