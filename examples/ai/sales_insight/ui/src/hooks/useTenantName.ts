import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useTenantName(tenantId: string | undefined) {
  const [tenantName, setTenantName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tenantId) return;

    fetch(`/api/tenants/${tenantId}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 399) {
          return res.json();
        } else {
          console.log(
            'failed to get tenant name, redirecting for re-login ' +
              res.status +
              ' ' +
              res.statusText,
          );
          throw new Error('Failed to fetch tenant name');
        }
      })
      .then((data) => {
        setTenantName(data.name);
      })
      .catch(() => {
        navigate('/');
      });
  }, [tenantId, navigate]);

  return tenantName;
}
