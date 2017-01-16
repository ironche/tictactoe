
# Prerequisites

- Get [Node.js][node-download].

# Running the app

- Run `npm install`,
- Run either `npm start` or `npm run dev`,
- Open several browser instances at http://127.0.0.1:8080/play/:ID , where ":ID" can be any random string.

# Known issues

Sometimes there is a problem with emitting events from server to clients. Because of that, client doesn't get an update about new users who joined the room or played their moves. In that case, please refresh server (terminate process and restart it) and try to refresh a browser for all test clients until events start to arrive and you can see that while one user is in waiting mode, another can make a move. For testing, you may use built-in logger below tic-tac-toe grid.

To debug further this issue, feel free to check [server socket][server-socket] at line 45 (this is the reason why in most cases clients don't receive necessary information because event doesn't reach anyone).

[node-download]: https://nodejs.org/en/download/
[server-socket]: https://github.com/ironche/tictactoe/blob/master/app/play/server/socket.js
