const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

let fileName = '';

let dirName = '/Users/charlieyorke/chipsgame/client/';

app.use('/',express.static(dirName));

app.get('/', function(req, res){
    res.sendFile(dirName+'/homepage.html'); // change the path to your index.html
});

function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

io.on('connection', (socket) => {
    let user = {
        id: socket.id,
        roomLabel: ''
    }

    let clients;

    socket.on('newGame', () => {
        let testCode = makeId(5);

        user.roomLabel = testCode

        socket.emit('testEmit', testCode);

        socket.join(testCode);

        clients = io.sockets.adapter.rooms.get(testCode);

        // console.log(testCode);
        // console.log(clients);
    })

    socket.on('joinGame', (code) => {
        user.roomLabel = code;

        socket.join(code);

        clients = io.sockets.adapter.rooms.get(code);

        // console.log(user.roomLabel);

        // console.log(clients);

        // socket.to(code).emit('testRoomEmit');
        io.to(code).emit('testRoomEmit');
    })

    socket.on('playerMove', () => {
        // console.log(user.roomLabel);
        // console.log(code2)
        // console.log(code2);
        // socket.to(user.roomLabel).emit('testingPlayerMoves');
        io.to(user.roomLabel).emit('testingPlayerMoves');
    })



});


server.listen(3000, () => {
  console.log('listening on :3000');
});

// const express = require('express');
// const { stat } = require('fs');
// const app = express();
// const http = require('http');
// const { connect } = require('http2');
// const { join } = require('path');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);

// let dirName = '/Users/charlieyorke/chipsgame/client/';

// app.use('/',express.static(dirName));

// app.get('/', function(req, res){
//     res.sendFile(dirName+'/homepage.html'); // change the path to your index.html
// });

// // let allPossibleState = [];

// // let clientRooms = [];

// // let arr = [];

// // let possibleGames;

// // let allPlayers = [];


// io.on('connection', (socket) => {
//     // console.log(`Socket ${socket.id} has connected`);
//     // let player = {};
//     // player['id'] = socket.id;

//     console.log('hi');


//     // client.on('newGame', handleNewGame);
//     // client.on('joinGame', handleJoinGame);
//     // client.on('settingPlayerNumbers', handleGameSize)
//     // client.on('gameInitFinished', testFunc);

//     // socket.on('disconnect', () => {
//     //     // console.log(`Player ${socket.id} has disconnected from the server`);
//     // })

//     // function handleNewGame() {



//     //     // let roomName = makeId(5);

//     //     // room = io.sockets.adapter.rooms;

//     //     // socket.join(roomName);

//     //     // player['roomLabel'] = roomName;

//     //     // state['roomId'] = roomName;
//     //     // state['host'] = player['id'];

//     //     // clientRooms.push(state);

//     //     // if (player['id'] === state['host']) {
//     //     //     state['playersInGame'].push(player['id']);
//     //     // }

//     //     // socket.emit('testGameCode', 'hello');

//     //     // console.log(state); 
//     //     // // console.log(room); 

//     //     // console.log(socket.rooms);
//     // }    

//     // // removed 'code' as a paramater, may have to add it back eventually //
//     // function handleJoinGame(code) {
//     //     // player['enteredCode'] = code;

//     //     // room = io.sockets.adapter.rooms;

//     //     // for (let i = 0; i < clientRooms.length; i++) {
//     //     //     // arr.push(clientRooms[i].playersInGame);
//     //     //     if (clientRooms[i].roomId === player['enteredCode']) {
//     //     //         clientRooms[i].playersInGame.push(player['id']);
//     //     //         socket.join(code);
//     //     //     }
//     //     // }

//     //     // io.of('/').adapter.on('join-room', (room, id) => {
//     //     //     id = player['id'];
//     //     //     room = code;
//     //     //     console.log(`socket ${id} has joined room ${room}`)
//     //     // })


//     //     // console.log(clientRooms);

//     // }

//     // function handleGameSize(size) {
        
//     // }

//     // function testFunc() {

//     // }
// });

// function makeId(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// server.listen(3000, () => {
//   console.log('listening on :3000');
// });




// notes //

// want a global state object that can hold the states of all possible games //
// for example: const state = {}; //

// want a global state object that will allow for an easy look up of the room name of a particular user id // 
// for example: const clientRooms = {}; //

//  //


