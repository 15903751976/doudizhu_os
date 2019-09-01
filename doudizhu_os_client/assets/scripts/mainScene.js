import global from './../global';
import landshow from './components/landManager'; //p2  1m20s
//import SocketController from './data/socket-controller'
cc.Class({
    extends: cc.Component,
    properties: {
        tipesLbel:{
            default: null,
            type:cc.Node
        },
        joinRoomPrefabs:{
            default:null,
            type:cc.Prefab
        },
        createRoomPrefabs:{
            default:null,
            type:cc.Prefab
        }
    },
    onLoad:function(){

        // global.socket.login();
        // //开始init连接//调用global脚本里面的socket套接字，// global.socket再调用SocketController()方法进行socket.io的进行连接服务器端口，// defines是全局默认IP和端口
        // global.socket.onLogin();
        // //p3 45m00s
    },
    buttonClick(event,customData){
        console.log('custom data= ' +customData);
        switch(customData){
            case 'wxlogin':
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
                    break;
            case'joinButton':
                //landshow(this.joinRoomPrefabs);
                this.createPrefabs(this.joinRoomPrefabs);
                break;
            case'createButton':
                // let node = cc.instantiate(this.createRoomPrefabs);
                // node.parent=this.node;
                this.createPrefabs(this.createRoomPrefabs);
                break;
            default:
                break;
        }
    },
    /**实例化预制体*/
    createPrefabs(pre){
        let node = cc.instantiate(pre);
        node.parent=this.node;
    },

    update(dt){
        let offset=300;
        this.tipesLbel.position=cc.v2(this.tipesLbel.position.x-1, this.tipesLbel.position.y);
           if(this.tipesLbel.position.x <= -cc.winSize.width/2-offset){
               this.tipesLbel.position=cc.v2(cc.winSize.width/2+offset,this.tipesLbel.position.y);
           }

    }
});
