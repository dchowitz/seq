# Idea

A simple web app providing true sequences. A sequence here is a numeric value which gets incremented on each request in an atomic fashion. This may be useful in situations where different parties frequently need to have guaranteed unique numbers in ascending order.

### Example

A distributed software development team needs his DB migration scripts numbered in a proper way.

# App

The *homepage* shows some general statistics. Currently only the number of sequences, but requests per day or mean requests per sequence would be possible as well.

On requesting a new sequence from the homepage, the corresponding sequence page shows up. This page could also contain some sequence specific statistics. But right at the moment, there is only the current count. Each time the sequence page is requested, the counter gets incremented.
Sequences created by clicking "Create Sequence" in the homepage are identified by a hard to guess, system chosen id (via shortid), which is part of the sequence page URL. That is why a user should bookmark the sequence page.

It is also possible for a user to request a new sequence with an own identifier by building the sequence page URL manually. But in this case, it's not unlikely someone else did the same in the past, in which case the existing sequence would just get incremented. Maybe the idea of friendly sequence names (or aliases) would be an alternative here (see #6).

Writing the app was a short term effort with the focus solely on server side code. There is no modern styling applied, so the pages look like they are coming straight from the early days of the web. Don't know yet, if I'll put some effort into that.

# How to Start

Prerequisite: A local Docker installation since this app is backed by Redis running in a container. The Redis container `seq-redis-persist`, which is used to run the app locally, uses the default Redis persistence option (append-only-file).

```
npm install
npm run dev
```

# Tests

For the sake of simplicity, testing is based solely on Selenium at the moment. Like Redis, the Selenium server runs in a Docker container avoiding the hassle of installing the required Java runtime locally, downloading the Selenium jar, etc. Docker helps to keep my machine clean!

Test execution relies on a dedicated Redis container `seq-redis` which performs no persistence at all.

```
npm run e2e
```

# WTF?

> Are you serious? Who needs this?

Well just me. I am always looking for some simple topics which allow me to have a stab at technologies currently in my focus of interest. In this case, I was interested in fiddling with:
- Redis
- Docker
- Selenium

# License

See the [LICENSE](license.md) file for license rights and limitations (MIT).
