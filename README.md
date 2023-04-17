# [Cubaa.net](https://www.cubaa.net)

Cubaa is a two player card game built in React. The back-end for this project is an express server that uses socket.io for real-time data transmission between users.

The back-end for this project is currently hosted on my VPS. The server is healthy, but connection may not always be reliable at this time.

## Known Bugs and Issues

Users may encounter a bug where they are unable to place cards on their triangle during the first phase of the game. This is a relatively rare occurance and for now, users can open a new room and begin a new game to work around this bug.

When the deck has one card remaining and a player draws two, this can cause one of the cards in the game to duplicate.
