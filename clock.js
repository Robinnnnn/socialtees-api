var CronJob = require('cron').CronJob;
var { getDoggieStatus } = require('./src/main');

const job = new CronJob('* * * * *', getDoggieStatus);

job.start();
