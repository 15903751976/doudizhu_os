//playerData储存的是用户ID,昵称和等数据
let PlayerData=function () {   //p1   53m03s
    let that={};
    that.uniqueID = '300000';
    that.uid = 20 + Math.floor(Math.random() *10);
    that.nickName = '小明' + Math.floor(Math.random() * 10);//p3 35m29s
    that.avatarUrl = 'www.baidu.com';
    that.houseCardCount = 15;
    // for(let i=0;i<7;i++) {
    //     that.uniqueID += Math.floor(Math.random() * 10);
    // }
    that.wxLoingSuccess=function (data) {//微信登陆返回函数  //wxLoingSuccess方法实际是对字段that的处理，最终返回的还是一个that变量。landManager里面的landShow才是一个真正的方法
        that.uniqueID = data.uniqueID;
        that.nickName = data.nickName;
        that.avatarUrl = data.avatarUrl;
        that.houseCardCount=data.houseCardCount;

    };
    that.loginSuccess=function (data) {//给客户端返回一个登陆成功的消息//p3 35m33s
       console.log('data = 1234 = ' + JSON.stringify(data));
        console.log('1234567890');
    };
    return that;
};
export default PlayerData;