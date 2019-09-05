const  Player=function(socket,data){
    let that={};
    let _socket = socket;
    let _uid = data.uid;             //p3 42m20s
    let _nickName = data.nickName
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;//p6 35m50s换成houseCardCount
    let _callBackIndex = data.callBackIndex;
    _socket.emit('notify',{msg:'login',callBackIndex:_callBackIndex,data:{//p6 32m25s
            uid: _uid,
            nickName:_nickName,
            avatarUrl:_avatarUrl,//
            houseCardCount: _houseCardCount
        }});
    return that;
};
let _playerList = [];
/**创建玩家的东西，玩家管理器*/
exports.createPlayer = function (socket,data) {//p3 41m31s
    console.log('create Player 7890 = '+ JSON.stringify(data));
    let player = Player(socket,data);
        _playerList.push(player);   //把玩家列表放进来//p3 43m30s
}