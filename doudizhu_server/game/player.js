const gameController = require('./game-controller');
const  Player=function(socket,data){
    let that={};
    let _socket = socket;
    let _uid = data.uid;             //p3 42m20s
    let _nickName = data.nickName
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;//p6 35m50s换成houseCardCount
    //let _callBackIndex = data.callBackIndex;
    const  notify = function(msg,index,data){
        _socket.emit('notify',{msg:msg,callBackIndex:index,data:data});
    };
    // _socket.emit('notify',{msg:'login',callBackIndex:_callBackIndex,data:{//p6 32m25s
    //         uid: _uid,
    //         nickName:_nickName,
    //         avatarUrl:_avatarUrl,//
    //         houseCardCount: _houseCardCount
    //     }});
    notify('login',data.callBackIndex,{
        uid: _uid,
        nickName:_nickName,
        avatarUrl:_avatarUrl,//
        houseCardCount: _houseCardCount
    });
    _socket.on('notify',function (res) {//p6 55m
       let msg = res.msg;
       let callBackIndex = res.callBackIndex
       let data = res.data;
       console.log('data = ' + JSON.stringify(data))
       switch(msg){
           case'create_room':
               console.log('创建房间');
                //notify('create_room',callBackIndex,'create room success')
               gameController.createRoom(data,function (err,resp) {
                   if (err){
                       console.log('create room err = '+err);
                   }else{
                       notify('create_room',callBackIndex,{roomID:resp});//p7 23m50s
                   }
               });
               break;
           case 'join_room':
               gameController.joinRoom(roomID,that,function(err,resp){

               }); //  that代表的就是这个玩家，吧玩家加入房间
               break;
           default:
               break;
       }
    });
    return that;
};
let _playerList = [];
/**创建玩家的东西，玩家管理器*/
exports.createPlayer = function (socket,data) {//p3 41m31s
    console.log('create Player 7890 = '+ JSON.stringify(data));
    let player = Player(socket,data);
        _playerList.push(player);   //把玩家列表放进来//p3 43m30s
}