const  Player=function(socket,data){
    let that={};
    let _socket = socket;
    let _uid=data.uid;             //p3 42m20s
    let _nickName=data.nickName
    let _avatarUrl=data.avatarUrl;
    let _house_card_count = data.house_card_count;
    _socket.emit('login','welcome');

    return that;
};
let _playerList = [];
/**创建玩家的东西，玩家管理器*/
exports.createPlayer=function (socket,data) {//p3 41m31s
    console.log('create Player 7890 = '+ JSON.stringify(data));
    let player = Player(socket,data);
        _playerList.push(player);   //把玩家列表放进来//p3 43m30s
}