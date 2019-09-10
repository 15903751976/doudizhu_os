const Room = require('./room');//p7 19m35s
let _roomList = [];
exports.createRoom = function(data,cb){
    let roomID = '';
    for (let i = 0; i< 6 ;i++ ){
        roomID += Math.floor(Math.random() * 10);
    }
    console.log('roomid = ' + roomID);
    let room = Room(roomID,data);
    _roomList.push(room);//p7 20m53s
    if (cb){
        cb(null,roomID);
    }
};
exports.joinRoom = function(roomID,player,cb){//p7 28m
    for (let i=0; i < _roomList.length;i++) {
        let room = _roomList[i];
        if (room.roomID === roomID) {
            room.joinPlayer(player,cb);
        }
    }
    // 如果通过ID没有找到对应的房间
    if (cb){
        cb('no have this room');
    }
};