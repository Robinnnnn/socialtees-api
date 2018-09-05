var CronJob = require('cron').CronJob;
var { getStatus } = require('./status');

const job = new CronJob('*/5 * * * * *', getStatus);

job.start();
