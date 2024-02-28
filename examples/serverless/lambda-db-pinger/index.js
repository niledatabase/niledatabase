const { Client} = require('pg')
require('dotenv').config()
const { sendDistributionMetric } = require('datadog-lambda-js');


function reportMetrics(name, value, tag) {
    sendDistributionMetric(name, value, 'env:prod', 'region:us-west-2', 'service:lambda_db_pinger', tag);
}


module.exports.run = async (event, context) => {
  const time = new Date();
  console.log(`Cron function "${context.functionName}" ran at ${time}, tested with ${process.env.DATABASE_URL}`);

  let client;
  try {
    var start = process.hrtime();
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: process.env.CONNECTION_TIMEOUT_MILLIS,
      query_timeout: process.env.QUERY_TIMEOUT_MILLIS
    })
    await client.connect()
  } catch (err) {
    console.error('Error connecting to database', err)
    reportMetrics('db.pinger.error', 1, 'error:connect');
    reportMetrics('db.pinger.success', 0);
    return
  } finally {
    // you get a diff by passing the start time to process.hrtime, the result is [1, diff in nanoseconds]
    var delay = process.hrtime(start);
    reportMetrics('db.pinger.latency', delay[1] / 1000000, 'step:connect');
    if (client) {
      await client.end()
    }
  }
  
  try {
    var start = process.hrtime();
    const res = await client.query('SELECT $1::text as message, now() as now', ['Checking nile..'])
    await client.query('select count(*) from todos; ') // cross-tenant query

  } catch (err) {
    console.error('Error running query', err)
    reportMetrics('db.pinger.error', 1, 'error:query');
    reportMetrics('db.pinger.success', 0);
    return
  } finally {
    var delay = process.hrtime(start);
    reportMetrics('db.pinger.latency', delay[1] / 1000000, 'step:query');
    if (client) {
      await client.end()
    }
  }
  
  try {
    await client.end()
    reportMetrics('db.pinger.error', 0,'error:none'); // without this, the error alert will never recover
    reportMetrics('db.pinger.success', 1);
  } catch (err) {
    console.error('Error ending client', err)
    reportMetrics('db.pinger.error', 1, 'error:end');
    reportMetrics('db.pinger.success', 0);
  }
}