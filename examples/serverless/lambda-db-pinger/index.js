const { Client} = require('pg')
require('dotenv').config()
const { sendDistributionMetric } = require('datadog-lambda-js');

module.exports.run = async (event, context) => {
  const time = new Date();
  console.log(`Cron function "${context.functionName}" ran at ${time}, tested with ${process.env.DATABASE_URL}`);

  let client;
  try {
    client = new Client(process.env.DATABASE_URL)
    await client.connect()
  } catch (err) {
    console.error('Error connecting to database', err)
    sendDistributionMetric('db.pinger.error', 1, 'env:prod', 'region:us-east-1', 'service:lambda_db_pinger', 'error:connection');
    return
  }
  
  try {
    const res = await client.query('SELECT $1::text as message, now() as now', ['Checking nile..'])
    await client.query('select count(*) from todos; ') // cross-tenant query
  } catch (err) {
    console.error('Error running query', err)
    sendDistributionMetric('db.pinger.error', 1, 'env:prod', 'region:us-east-1', 'service:lambda_db_pinger', 'error:query');
    return
  }
  
  try {
    await client.end()
    sendDistributionMetric('db.pinger.success', 1, 'env:prod', 'region:us-east-1', 'service:lambda_db_pinger');
  } catch (err) {
    console.error('Error ending client', err)
    sendDistributionMetric('db.pinger.error', 1, 'env:prod', 'region:us-east-1', 'service:lambda_db_pinger', 'error:end');
  }
}