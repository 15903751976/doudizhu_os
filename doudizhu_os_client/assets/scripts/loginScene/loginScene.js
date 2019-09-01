import global from './../global'
cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad(){
        global.socket.init();
    },
    onButtonClick(event,customData){
      if (customData==='wxlogin'){
          console.log("微信登陆");
              global.socket.login(  //p1 52m13s  60m52s
              global.tianba.playerData.uniqueID,
              global.tianba.playerData.nickName,
              global.tianba.playerData.avatarUrl,function(err,data){
                  if (err){
                      console.log('mainScene.js 输出错误' + err);
                  }else{
                      console.log('login success 2345' + JSON.stringify(data));
                  }
              });
          cc.director.loadScene('mainScene');
      }
    }
});
