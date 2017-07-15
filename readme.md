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

# Features

(Maybe better transfer to github issues...)

## Homepage

- Show some general statistics like the number of sequences, requests per day or mean requests per sequence.
- Create a new sequence with a system given, hard to guess name (something like a hash or uuid).

## Sequence Page

- Each request increments the sequence and shows the resulting number.
- Maybe provide an API link.

## Open Points

- Do we need user choosen sequence ids? The user can manually enter a sequence page URL and (if lucky) starts a new sequence with the given name.

- When accessing a sequence page for a non-existing sequence id: Do we redirect to the homepage with the hint the sequence doesn't exist yet? Or do we silently create a new sequence? I tend to the latter.

- What about friendly sequence names? We could let the user associate a sequence with a name of his choice, if not already used by someone else. There could be a sequence status page requested by the friendly name, which doesn't perform an increment. Increments are only performed at requesting the (somehow secret) sequence ids.

- Do we need a stats page for a single sequence? Such a request shouldn't perform an increment.

- Make sequence URLs easy to copy.

- Nicer UI.

- HTTP API