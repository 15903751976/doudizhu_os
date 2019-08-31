const socket=require('socket.io');
const app=socket('3000');//socket套接字连接  对应socket-controller的连接监听地址

const  config=require("./config.json");//config是数据库的连接配置
const  mydb=require('./utilily/db');//p2 5m18s-6m  //mysql数据库连接

const  playerController=require('./game/player');//player玩家列表信息
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
app.on('connection',function (socket) {
    console.log('a user connected app.js/app.on函数 = ');
    socket.emit('welcome','hello world!');
    socket.on("login",function (res) {// 8y3r   login的“”，写作‘’  //从客户端发来的信息默认都加res
        console.log('a user login = '+ JSON.stringify(res));//data服务器接收客户端数据
        console.log('这是app.js 服务器接受的客户端的数据 = '+ JSON.stringify(res));
        mydb.checkPlayer(res.uniqueID,function (err,data) {
            if (err){
                console.log('err = '+ err );
            } else {
                if (data.length === 0) {
                    //說明系統裡面不存在玩家
                    console.log("不存在這個玩家")
                    let uid = '1';//p4 11m10s
                    for (let i = 0; i < 7; i++) {
                        uid += Math.floor(Math.random() * 10);//floor向下取整
                    }
                    let nick= JSON.stringify(res.nickName);
                    console.log('这是要sql用到插入语句  看对不对!!! ' + res.uid)
                    mydb.insertPlayerInfo({//把res传来的数据，放到insertPlayerInfo字段里存起来
                        unique_id: res.uniqueID,
                        uid:uid,////p4 11m10s
                        nick_name: res.nickName,
                        avatar_url:res.avatarUrl,
                        house_card_count: 5,
                    });
                    console.log('这是要sql用到插入语句  看对不对？？？ ' +  res.uniqueID  + "," +   res.uid  + "," +   res.nickName +  ","  +  res.avatarUrl);
                    console.log('这是要sql用到插入语句  看对不对？？？? ? ? ? '+  res.uid);
                    playerController.createPlayer(socket,{
                        uid:uid,//
                        nickName:res.nickName,
                        avatarUrl:res.avatarUrl,
                        houseCardCount:5
                    });
                } else {
                    //說明存在玩家
                    mydb.updatePlayerInfo('unique_id', res.uniqueID, {
                        nick_name: res.nickName,
                        avatar_url: res.avatarUrl,
                    });
                    playerController.createPlayer(socket,{//p3 38m00s   //p3 40m40s
                        uid:data[0].uid,
                        nickName:res.nickName,
                        avatarUrl:res.avatarUrl,
                        houseCardCount:data[0].house_card_count

                    })
                }
            }
         })

    })
});
console.log('listen on 3000 '+'Im a App 3000');