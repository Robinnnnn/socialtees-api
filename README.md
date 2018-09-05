# Sad Doggie Status Checker

This script is a cron job that detects changes to the list of pets featured on Socialtees using a hashing mechanism. When the list is updated, an SMS notification is sent to the designated recipients listed in `/config`. While the user must visit the website to see what's changed, a future version of this script should be able to list which doggies specifically have been added / removed.

## Deploying

Ensure latest is committed to master, then push to heroku:

    $ git push origin master

    $ git push heroku master

## Scaling

Heroku might freak out if a main process / start script is not provided. Since all we care about is the clock, run the following upon successful deploy:

    $ heroku ps:scale web=0 clock=1

## Monitoring

For continuous logs:

    $ heroku logs -t

For getting the name of the dyno:

    $ heroku ps

For ssh'ing into the dyno (e.g. `clock.1`):

    $ heroku ps:exec --dyno=clock.1
