import defines from './../defines'
const  SocketController=function () {//   p1 49m18s   51m11s
    let that={};
    let _socket=undefined;
    that.init=function () {
        //_socket=io(http://localhost:3000);
        _socket=io(defines.serverUrl);// defines是全局默认IP和端口
    };
    that.login=function (unique,nickName,avatar,houseCardCount,cb) {//  p1 61m56s   表示调用结果的时候调用cb
        _socket.emit('login',{
               uniqueID:unique,
               nickName:nickName,
               avatarUrl:avatar,
               houseCardCount:houseCardCount,

        });
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
