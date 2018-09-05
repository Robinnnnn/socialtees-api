# Deploying

Ensure latest is committed to master, then push to heroku:

    $ git push origin master

    $ git push heroku master

Heroku might freak out if a main process / start script is not provided; since all we care about is the clock, run the following upon successful deploy:

    $ heroku ps:scale web=0 clock=1

For continuous logs:

    $ heroku logs -t

For getting the name of the dyno:

    $ heroku ps

For ssh'ing into the dyno (e.g. `clock.1`):

    $ heroku ps:exec --dyno=clock.1