Reacive-Blog
============

A blogging system based on node.js and react as the frontend technology running on the server side and the client side.

## Technological artifacts

- (p)react js - using preact probably
- flow typed
- node js backend
- unified language level (babel stage 3 on the server side and the client side)
- transpiled by webpack on the client and babel on the server
- express js on the server
- couch db as database
- styled components as main styling language

## What does our blog software need?

- compatibility to heroku and other cloud hosting systems
- writing articles in a taxonomy system
- in place editing / edit mode with a medium like interface
- writing comments using the same interface
- ready to run system
- optional production ready caching
- service worker for the assets
- labels with different taxonomies and m:n relation to articles
- taxonomy based m:n relations between articles
  - eg link a -> b, next a -> b, previous b -> a, see-also a -> b
- auto relation and link control system (a link remains intact even if the name changes)
- simple and static permalink structure
  - /taxonomy/article-slug
  - /labels/taxonomy/label-slug
- async loading of comments (only the article itself is sync)
- trackback / pingback function
- support for rss and atom
- incremental popup search
- tracking system (internal - showing statistics in the backend)
- admin console backend
  - displaying statistics
- clippings: small movable snippets that can be placed in widget areas
- easy widget system

