const { Client } = require("pg");
require("dotenv").config();
const { sendDistributionMetric } = require("datadog-lambda-js");

function reportMetrics(name, value, tag) {
  sendDistributionMetric(
    name,
    value,
    "env:prod",
    `region:${process.env.AWS_REGION}`,
    "service:lambda_db_pinger",
    tag
  );
}

// the first value is seconds portion of time delta, and the second value is the nanoseconds
function delayToMs(hrtime) {
  return hrtime[0] * 1000 + hrtime[1] / 1000000;
}

module.exports.run = async (event, context) => {
  const time = new Date();
  console.log(
    `Cron function "${context.functionName}" ran at ${time}, tested with ${process.env.DATABASE_URL}`
  );

  let client;
  try {
    var start = process.hrtime();
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: process.env.CONNECTION_TIMEOUT_MILLIS,
      query_timeout: process.env.QUERY_TIMEOUT_MILLIS,
    });
    await client.connect();
  } catch (err) {
    console.error("Error connecting to database", err);
    if (err.message.search("timeout") >= 0) {
      reportMetrics("db.pinger.error", 1, "error:timeout");
    } else {
      reportMetrics("db.pinger.error", 1, "error:connect");
    }
    reportMetrics("db.pinger.success", 0);
    if (client) {
      await client.end();
    }
    return;
  } finally {
    // you get time delta by passing the start time to process.hrtime
    var delay = process.hrtime(start);
    reportMetrics("db.pinger.latency", delayToMs(delay), "step:connect");
  }

  try {
    var start = process.hrtime();
    const res = await client.query("SELECT $1::text as message, now() as now", [
      "Checking nile..",
    ]);
    await client.query("select count(*) from todos; "); // cross-tenant query
  } catch (err) {
    console.error("Error running query", err);
    if (err.message.search("timeout") >= 0) {
      reportMetrics("db.pinger.error", 1, "error:timeout");
    } else {
      reportMetrics("db.pinger.error", 1, "error:query");
    }
    reportMetrics("db.pinger.success", 0);
    if (client) {
      await client.end();
    }
    return;
  } finally {
    var delay = process.hrtime(start);
    reportMetrics("db.pinger.latency", delayToMs(delay), "step:query");
  }

  try {
    await client.end();
    reportMetrics("db.pinger.error", 0, "error:none"); // without this, the error alert will never recover
    reportMetrics("db.pinger.success", 1);
  } catch (err) {
    console.error("Error ending client", err);
    reportMetrics("db.pinger.error", 1, "error:end");
    reportMetrics("db.pinger.success", 0);
  }
};
