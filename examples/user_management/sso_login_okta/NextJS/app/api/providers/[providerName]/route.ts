import { api } from '@/nile/Server';

export async function PUT(req: Request) {
    return await api.auth.updateProvider(req);
}

export async function POST(req: Request) {
    return await api.auth.createProvider(req);
  }
