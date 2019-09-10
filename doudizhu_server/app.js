const socket=require('socket.io');
const app=socket('3000');//socket套接字连接  对应socket-controller的连接监听地址

const  config=require("./config.json");//config是数据库的连接配置
const  mydb=require('./utilily/db');//p2 5m18s-6m  //mysql数据库连接

const  el = require('./utilily/eventListener');//node.js的模块化方法
const  playerController = require('./game/player');//player玩家列表信息

const  room = require('./game/room');
let r = room();
console.log('room = '+ JSON.stringify(r));

mydb.connect(config.mysqlConfig);
// mydb.checkPlayer("100000",function(err,cb){
//
// });
/**插入玩家数据   在db里面插入到的信息  */
// mydb.insertPlayerInfo({
//     unique_id:'100000',
//     uid:'1200000',
//     nick_name:"小明",
//     avatar_url:'taobao.com',
//     house_card_count:5
// });
/**更新玩家数据   在db里面插入到的信息  */
// mydb.updatePlayerInfo('unique_id','100000',{
//    nick_name:"小王",
//    avatar_url:"taobao.com"
// });

// let event = el.EventListener({});     //9y4r  忘记关掉，导致错误
// event.on('test',function(pl){
//     console.log('pl = ' + pl);
// });
// event.fire('test','ok');

app.on('connection',function (socket) {
    console.log('a user connected');
    socket.emit('welcome','hello world!');
    socket.on("notify",function (res) {// 8y3r   login的“”，写作‘’  //从客户端发来的信息默认都加res
        console.log('a user login = ' + JSON.stringify(res));
        let notifyData = res.data;
        let callbackIndex = res.callBackIndex;
        let msg = res.msg;
        switch(msg){
            case'login':
                mydb.checkPlayer(notifyData.uniqueID, function (err, data) {//p6 32m10s
                    if (err) {
                        console.log('err = ' + err);
                    } else {
                        if (data.length === 0) {
                            //說明系統裡面不存在玩家
                            console.log("不存在这个玩家");
                            let uid = '1';//p4 11m10s
                            for (let i = 0; i < 7; i++) {
                                uid += Math.floor(Math.random() * 10);//floor向下取整
                            }
                            mydb.insertPlayerInfo({//把res传来的数据，放到insertPlayerInfo字段里存起来
                                unique_id: notifyData.uniqueID,//////p4 11m00s就已经有了notifyData.uniqueID   ??????大问题unique_id应该是uniqueID
                                uid: uid,////p4 11m10s
                                nick_name: notifyData.nickName,
                                avatar_url: notifyData.avatarUrl,
                                house_card_count: 5,
                            });
                            playerController.createPlayer(socket, {
                                uid: uid,//
                                nickName: notifyData.nickName,
                                avatarUrl: notifyData.avatarUrl,
                                houseCardCount: 5,
                                callBackIndex:callbackIndex
                            });
                        } else {
                            //說明存在玩家
                            mydb.updatePlayerInfo('unique_id', notifyData.uniqueID, {
                                nick_name: notifyData.nickName,
                                avatar_url: notifyData.avatarUrl,
                            });
                            playerController.createPlayer(socket, {//p3 38m00s   //p3 40m40s
                                uid: data[0].uid,
                                nickName: notifyData.nickName,
                                avatarUrl: notifyData.avatarUrl,
                                houseCardCount: data[0].house_card_count,
                                callBackIndex: callbackIndex
                            })
                        }
                    }
                });
                break;
            default:
                break;
        }
    })
});
console.log('listen on 3000 '+'Im a App 3000');