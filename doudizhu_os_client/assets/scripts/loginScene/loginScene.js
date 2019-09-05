import global from './../global'
cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad(){
        global.socket.init();
    },
    onButtonClick(event,customData){
      if (customData==='wxlogin'){// p6 9m30s
          console.log("微信登陆");
              global.socket.login(  //p1 52m13s  60m52s
              global.tianba.playerData.uniqueID,
              global.tianba.playerData.nickName,
              global.tianba.playerData.avatarUrl,function(err,data){
                  if (err){
                      console.log('login err' + err);
                  }else{
                      console.log('login data' + JSON.stringify(data));
                      cc.director.loadScene('mainScene');//p6 9m55s  13m41s
                  }
              });
      }
    }
});
