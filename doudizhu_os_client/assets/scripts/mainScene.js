import global from './../global';
import landshow from './components/landManager'; //p2  1m20s
//import SocketController from './data/socket-controller'
cc.Class({
    extends: cc.Component,
    properties: {
        nickNameLabel:{
            default:null,
            type:cc.Label
        },
        idLabel:{
            default:null,
            type:cc.Label
        },
        headImage:{
            default:null,
            type:cc.Sprite
        },
        headSprite:{
          default:null,
          type:cc.SpriteFrame
        },
        houseCardCountLabel:{
          default:null,
          type:cc.Label
        },
        tipsLabel:{
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
    onLoad:function(){//p6 38m
            this.nickNameLabel.string = global.tianba.playerData.nickName;
            this.idLabel.string = global.tianba.playerData.uid;
            this.houseCardCountLabel.string = global.tianba.playerData.houseCardCount;
            /**
         *测试一
         */
            this.headImage.spriteFrame = this.headSprite;
        /***
         * 测试二
         */
        // cc.loader.loadRes('resources/png/game_role11',(err,tex)=>{
        //     if (err) {
        //         console.error('this load  head Image is err ' + err)
        //     }else{
        //         this.headImage.SpriteFrame = new cc.SpriteFrame(tex);
        //     }
        // });


            // cc.loader.load(global.tianba.playerData.avatarUrl,(err,tex)=>{
            //     if (err){
            //         console.log('err = ' + err)
            //     }
            //         console.log('Should load a texture from external url:  ' + (tex instanceof cc.Texture2D));
            //         //this.headImage.spriteFrame.setTexture(tex);
            //         this.headImage.spriteFrame = new cc.SpriteFrame(tex);
            // });
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
        this.tipsLabel.position=cc.v2(this.tipsLabel.position.x-1, this.tipsLabel.position.y);
           if(this.tipsLabel.position.x <= -cc.winSize.width/2-offset){
               this.tipsLabel.position=cc.v2(cc.winSize.width/2+offset,this.tipsLabel.position.y);
           }

    }
});
