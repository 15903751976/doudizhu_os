import defines from './../defines'
import EventListener from "../utility/event-listener";
import  EventListener from './../utility/event-liatener'
const  SocketController=function () {//   p1 49m18s   51m11s
    let that={};
    let _socket=undefined;
    let _callBackMap={};
    let  _callBackIndex = 1;
    let _event = EventListener({});
    that.init=function () {
        //_socket=io(http://localhost:3000);
        _socket = io(defines.serverUrl);// defines是全局默认IP和端口
        _socket.on('notify',function(data){
            console.log('notify = ' + JSON.stringify(data));
            let msg = data.msg;
            _event.fire(msg,data.data);
            let callBackIndex = data.callBackIndex;
            let cb = _callBackMap[callBackIndex];
            if (cb){
                cb(null,data.data);
            }
        })
    };
    const notify = function(msg,data){
        console.error('this is notify function = ' + msg + '......' + data)
        _socket.emit('notify',{msg:msg,callBackIndex:_callBackIndex,data:data})
        _callBackIndex ++;
    };
    const  request = function(msg,data,cb){
      _callBackMap[_callBackIndex] = cb;
      notify(msg,data);
    };
    that.login=function (uniqueID,nickname,avatar,cb) {//  p1 61m56s   p6 11m15s   表示调用结果的时候调用cb
        request('login',{uniqueID:uniqueID,nickName:nickname,avatarUrl:avatar},cb);//p6 16m13s
    };
    that.createRoom = function(data,cb){//p6 45m
        console.log('createRoom = ' + JSON.stringify(data));
        request('create_room',data,cb);
    };

    that.joinRoom = function(roomID,cb){//p7 25m 46s
        request('join_room',roomID,cb);
    };

    that.onInitPlayerInfo = function(cb){//p6 16m13s
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
