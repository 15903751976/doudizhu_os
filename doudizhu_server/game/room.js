const  Room = function(roomID,resp){
    let that ={};
    let _playerList = [];
    let _roomID = roomID;//p7 21m46s let写成了that
    console.log('create room ' + _roomID + ' , ' +  'resp = ' + JSON.stringify(resp));//p7 21m20s
    that.joinPlayer = function(player,cb){//p7  28m50s
        if (cb){
            cb(null,resp);//第一个参数是err，先传一个null，第二哥参数是规则，直接传resp
        }
        _playerList.push(player);//将传来的player玩家push到_playerList数组里面
    };

    Object.defineProperty(that,'roomID',{//p7 30m10s 用get,set的方式，使局部变量可以被访问
        get:function() {
            return _roomID;
        }
        // set:function(val){
        //     _roomID = val;
        // }
    })

    return that;
};
module.exports = Room;