# Onlineweb Frontend

## What is this :question:

<details><summary>Holy shit! What is this?!</summary>
<p>
  
Forged in God very flames,\
Do mine eyes, tell me lies?\
A new Dotkom project!\
\
Time is nigh! I must fly!\
Venture forth on mye quest,\
Goodbye Splash, goodbye Grades*,\
And goodbye S-D-F!\
\
I'll be off, Notiwall!\
Catch you later AMaCS!\
I'll be gone, Nibble2!\
I'm no longer your fool!\
\
Monoliths filled the gap while I waited to commit,\
The adventure of our lifes, now the frontend has split!

</p>
</details>

All projects need a start, this is ment as a way to start the though process of making the new front-end of 'Onlineweb'.

## Why is this :question:

- ~~I wanted to~~
- ~~I had an exam today, and needed something to do~~
- I had thoughs on how to do this, and needed a way to write them down, and share them
- By doing it this way, it is one step closer to actually happening
- Someone :tm: needed to kickstart the 'project'

### Why is it a GitHub repositry :question:

It does not need to be, but the thought was to start from a more 'clean' slate (not really).
Large code bases can be scary, and it may let developers feel more of an ownership tot he code they develop.

## How are we going to do this :question:

That is a really good question!

First it would need to be decided what we are going to build, and how we should build build it.

### What needs to be done

- [x] Create a GitHub repository
- [x] Find main technology
- [ ] Port current Onlineweb4 front-end to React*

### Decisions

- [ ] Types
- [ ] State
- [ ] Fetching data
- [ ] API architecture
- [ ] CSS

### Architectural Decisions

*I would believe it is already decided that this project is going to use `React`. This can of course be protested, but I will continue with React in mind from now on.*

#### Types

How should this be implemented with regards to typing?

The current solution in `Onlineweb4` is to use `prop-types` for the React parts.

Possible solutions:

- Continue using Props Types
- Implement TypeScript
- Implement Flow
- Stop using types
- Other alternatives?

#### State

How should state be implemented?

A project like this would benefit from handling state in a other ways than 'basic' React.
One thought is to implement `Redux`, which has already been used in other Dotkom projects, like `Super Duper Fiesta`

#### Fetching Data

Would be nice to have a structure on how data is fetched from the API(s).
They way this is done in the current React parts of `Onlineweb4` is a without any real structure.
An example of other ways to handle this is through how Angular (2+) 'Services' work. Separating the async data fetching from the view components.

*If I understand correctly this is done with Redux Sagas in `Super Duper Fiesta`?*

*I must admit that this is something I do not have a lot of experience with, but it is something I would really like to learn*

#### API Architecture

Possible solutions:

- Continue using Django Rest Framwork
- Implement Graphne Django (GraphQL)
- Hybridize? (Re-use Django Rest Framwork serializers in Graphene Django)

#### CSS

Sass, Less, Postcss, scopes, styled components, CSS in JS, inline. All the things.

### How does to affect Onlineweb4?

To make this happen, `Onlineweb4` would need to implement a more complete API.
All data would need to be fetchable for the entirely separate front-end.

## Going forward

To kick of the project, the current code from the `Onlineweb4` front-end shoud be ported to this repositry.
It should then be 'Reactified' :tm:, piece by piece.
When 'Feature Parity' :tm: is reached, it can be put up as `beta.online.ntnu.no`, and the actual redesign can begin.

*Sounds like a tedious job, but I can see no other way to actually go through with this*
