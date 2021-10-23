var express = require('express');
var app = express();
const expressWs = require('express-ws')(app);

let connects = [];

app.get('/', function (req, res) {
  res.send('Hello World! Welcome to web socket!');
});

app.ws('/:token', (ws, req) => {
    // IF WE WANT TO AUTHENTICATE TOKEN AND BROAD CAST MESSAGE THEN OPEN BELOW COMMENTS
    // authService.verifyToken(req.params['token'], err => {
    //             if (err) {
    //                 return false;
    //             }
    //             connects.push(ws);
    // });

    connects.push(ws);
    ws.on('message', messageData => {
        const message = JSON.parse(messageData)
        connects.forEach(socket => {
            socket.send(JSON.stringify(message.content));
        });
    });

    ws.send(JSON.stringify('Hi there, I am a WebSocket server'));

    ws.on('close', () => {
        connects = connects.filter(conn => {
            return (conn !== ws);
        });
    });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});