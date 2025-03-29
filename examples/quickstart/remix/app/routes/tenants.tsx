import * as React from "react";
import { Link, Form } from "react-router";

interface TenantsProps {
  tenants: Array<{
    id: string;
    name: string;
  }>;
  tenantsError?: string;
  message?: string;
}

export default function Tenants({ tenants, tenantsError, message }: TenantsProps) {
  if (message === "Unauthorized") {
    return null;
  }

  return (
    <section className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-6">
      {tenantsError && (
        <p className="text-red-500 dark:text-red-400">{tenantsError}</p>
      )}
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Create New Tenant</h2>
        <Form method="post" className="flex gap-2">
          <input type="hidden" name="action" value="createTenant" />
          <input
            name="tenantName"
            placeholder="Tenant name"
            className="flex-1 px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create
          </button>
        </Form>
      </div>

      {tenants.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Your Tenants</h2>
          <ul className="space-y-2">
            {tenants.map((tenant) => (
              <li 
                key={tenant.id}
                className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
              >
                <span className="text-lg">{tenant.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
} 