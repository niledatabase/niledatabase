import { Nile } from "@niledatabase/server";
import * as dotenv from "dotenv"

dotenv.config({ path: '.env.local', debug: true });

function serviceName(resp: any) {
  return resp.rows[0].name;
}

function generateExponentialRandom(mean: number): number {
  return -mean * Math.log(1 - Math.random());
}

async function generateUserActivityData(tenant_id: string) {
  const startDate = new Date('2024-01-01T00:00:00Z');
  const minutesInDay = 1440; // 24 hours * 60 minutes
  const data = [];
  const meanUsers = 5000;

  for (let i = 0; i < minutesInDay; i++) {
    const datetime = new Date(startDate.getTime() + i * 60000); // Increment by 1 minute
    const numActiveUsers = Math.floor(generateExponentialRandom(meanUsers));

    data.push({
      tenant_id: tenant_id,
      datetime: datetime.toISOString(),
      num_active_users: numActiveUsers,
    });
  }

  return data;
}

function generateServiceHealthStatus(meanLatency: number): { status: string, latency: number } {
  const latency = Math.floor(generateExponentialRandom(meanLatency));
  const status = latency < 300 ? 'healthy' : 'unhealthy'; // Example threshold for health status
  return { status, latency };
}

async function generateServiceHealthData(tenant_id: string, services: { name: string }[]) {
  const startDate = new Date('2024-01-01T00:00:00Z');
  const minutesInDay = 1440; // 24 hours * 60 minutes
  const data = [];
  const meanLatency = 100; // Adjust this value based on your desired mean latency

  for (let i = 0; i < minutesInDay; i++) {
    const datetime = new Date(startDate.getTime() + i * 60000); // Increment by 1 minute

    for (const service of services) {
      const { status, latency } = generateServiceHealthStatus(meanLatency);

      data.push({
        tenant_id: tenant_id,
        datetime: datetime.toISOString(),
        service_name: service.name,
        status,
        latency,
      });
    }
  }

  return data;
}


const nile = await Nile({
  user: process.env.NILEDB_USER,
  password: process.env.NILEDB_PASSWORD,
  debug: true,
});

console.log("Connected to Nile");

const services = [
  {name: 'Load Balancer', description: ''},
  {name: 'Redirection Service', description: 'Accepts a shortened URL and returns an HTTP 301 redirect to the original URL'},
  {name: 'API Gateway', description: ''},
  {name: 'URL Shortening Service', description: 'Converts a long URL into a short URL and vice-versa'},
  {name: 'Cache', description: 'Caches responses from URL Shortening Service'},
  {name: 'Analytics', description: 'Collects and analyzes data from all services'},
  {name: 'User Management', description: 'Manages user accounts and permissions'},
  {name: 'Database', description: 'Stores data for all services'},
  {name: 'Frontend', description: 'Web interface for Bitly'},
];

try {
  // TODO: more than one tenant
  const resp = await nile.db.query(`INSERT INTO tenants (name) VALUES ('bitly') RETURNING *`);
  const tenant_id = resp.rows[0].id;
  console.log("Created tenant");
  // create services
  for (const service of services) {
     await nile.db.query(`INSERT INTO services (tenant_id, name, description) VALUES ('${tenant_id}', '${service.name}', '${service.description}') RETURNING *`);
  }
  console.log("Created services");
  // create service dependencies
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'Load Balancer', 'Redirection Service')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'Load Balancer', 'API Gateway')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'Load Balancer', 'Frontend')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'Redirection Service', 'URL Shortening Service')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'Redirection Service', 'Cache')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'URL Shortening Service', 'Cache')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'URL Shortening Service', 'Database')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'API Gateway', 'URL Shortening Service')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'API Gateway', 'Analytics')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'API Gateway', 'User Management')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'Analytics', 'Database')`);
  await nile.db.query(`INSERT INTO service_dependencies (tenant_id, service_name, dependency_name) VALUES ('${tenant_id}', 'User Management', 'Database')`);
  console.log("Created service dependencies");

  const userActivityData = await generateUserActivityData(tenant_id);
  for (const record of userActivityData) {
    await nile.db.query(`INSERT INTO user_activity (tenant_id, datetime, num_active_users) VALUES ('${record.tenant_id}', '${record.datetime}', '${record.num_active_users}')`);
  }
  console.log("Created user activity data");

  const serviceHealthData = await generateServiceHealthData(tenant_id, services);
  for (const record of serviceHealthData) {
    await nile.db.query(`INSERT INTO service_health (tenant_id, datetime, service_name, status, latency) VALUES ('${record.tenant_id}', '${record.datetime}', '${record.service_name}', '${record.status}', '${record.latency}')`);
  }


} catch (e) {
  console.log("Failed to create sample data: ", e);
}


process.exit(1);
