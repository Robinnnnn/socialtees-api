var CronJob = require('cron').CronJob;
var { getStatus } = require('./status');

const job = new CronJob('* * * * *', getStatus);

job.start();
