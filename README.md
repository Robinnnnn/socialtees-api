# Sad Doggie Status Checker

This script detects changes to the sad pets featured on Socialtees. Updates, if any, are sent via SMS. 

<img src="https://i.imgur.com/BuAxOqp.jpg" width="400" />

## How does it work?
A [hashing algorithm](https://en.wikipedia.org/wiki/Hash_function) is used to freeze the latest state based on desired fields; this allows us to only subscribe to relevant changes while weeding out superfluous updates (e.g. removing a period from a description field). The most recent payload is also saved to provide more color to the diff report. Both are always available in `/cache`; using the filesystem over an in-memory cache is critical to recover from app failures.

Texts are sent via [Twilio](https://www.twilio.com/). I'm poor so every text will be prepended with `SENT FROM YOUR TWILIO TRIAL ACCOUNT` :sob:

## What Exactly Can It Detect?
* Newly added doggies
* Recently removed doggies
* Updated profile pictures (only if they don't already have one)

## Who Are The Recipients?

Recipients are designated in `/config`

## Deploying

Ensure latest is committed to master, then push to heroku:

    $ git push origin master

    $ git push heroku master

By default, Heroku freaks out if a main process / start script is not provided. Since all we need is to run a cron job via `clock.js`, we'll use the following upon _first_ successful deploy:

    $ heroku ps:scale web=0 clock=1

Subsequent deploys will not require this last snippet.

## Monitoring

For continuous logs:

    $ heroku logs -t

For getting the name of the dyno:

    $ heroku ps

For ssh'ing into the dyno (e.g. `clock.1`):

    $ heroku ps:exec --dyno=clock.1
