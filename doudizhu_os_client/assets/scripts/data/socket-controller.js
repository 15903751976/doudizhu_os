import defines from './../defines'
const  SocketController=function () {//   p1 49m18s   51m11s
    let that={};
    let _socket=undefined;
    let _callBackMap={};
    let  _callBackIndex = 1;
    that.init=function () {
        //_socket=io(http://localhost:3000);
        _socket=io(defines.serverUrl);// defines是全局默认IP和端口
        _socket.on('notify',function(data){
            console.log('notify = ' + JSON.stringify(data));
            let callBackIndex = data.callBackIndex;
            let cb = _callBackMap[callBackIndex];
            if (cb){
                cb(null,data.data);
            }
        })
    };
    const notify = function(msg,data){
        _socket.emit('notify',{msg:msg,callBackIndex:_callBackIndex,data:data})
        _callBackIndex ++;
    };
    const  request = function(msg,data,cb){
      _callBackMap[_callBackIndex] = cb;
      notify(msg,data);
    };
    that.login=function (unique,nickName,avatar,houseCardCount,cb) {//  p1 61m56s   表示调用结果的时候调用cb
        // _socket.emit('login',{
        //        uniqueID:unique,
        //        nickName:nickName,
        //        avatarUrl:avatar,
        //        houseCardCount:houseCardCount,
        //
        // });
        request('login',{uniqueID:unique,nickName:nickName,avatarUrl:avatar},cb);//p6 16m13s
    };

    that.onInitPlayerInfo = function(cb){
        //监听服务器发来的初始化用户信息，包含用户昵称 ID 头像 房卡数量
    };

    that.onLogin = function (data) { //p3 44m11s
        console.log('开始执行socketController.js   /    onLogin函数');
         _socket.on('login',function (data) {
             console.log('login  = '+JSON.stringify(data));
         })
    };

    return that;
    console.log('这是Socket_Controller.ts 客户端接受的服务器的数据 = ' + JSON.stringify(data))
};
export default SocketController;
