# Idea

A simple web app providing true sequences. A sequence here is a numeric value which gets incremented on each request in an atomic fashion. This may be useful in situations where different parties frequently need to have guaranteed unique numbers in ascending order.

### Example

A distributed software development team needs his DB migration scripts numbered in a proper way.

# How to Start

Prerequisite: A local Docker installation since this app is backed by Redis running in a container.

```
npm install
npm run dev
```

Note: The Redis store is not persistent between `npm run dev` calls.

# Tests

Testing is based solely on Selenium at the moment. Like Redis, the Selenium server runs in a Docker container avoiding the hassle of installing the required Java runtime locally, downloading the Selenium jar etc. This helps keeping my machine clean!

```
npm run e2e
```

# Features

## Homepage

- Show some general statistics like the number of sequences, requests per day or mean requests per sequence.
- Create a new sequence with a system given, hard to guess name (something like a hash or uuid).

## Sequence Page

- Each request increments the sequence and shows the resulting number.
- Maybe provide an API link.

# TODOs

(transfer open points / features to github issues)

- README: explain e2e testing with selenium and redis running in docker containers
- README: explain npm dev target with redis running in docker container
- production docker image
- test redis with persistent storage
- e2e target doesn't stop redis/selenium (post scripts) in case of test failures