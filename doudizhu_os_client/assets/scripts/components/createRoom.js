import global from "../global";

cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad () {

    },
    onButtonClick(event,customData){//p6 60m
        switch (customData) {
            case'close':
                this.node.destroy();
                break;
            case 'create':
                console.log('create ');
                //cc.director.loadScene('gameScene');
                global.socket.createRoom('create room',function (err,data) {//p6 63m
                    if (err){
                        console.log('err = ' + err);
                    } else{
                        console.error('create room data = ' + JSON.stringify(data));
                        //cc.director.loadScene('gameScene');
                        global.socket.joinRoom(data,roomID,function(){ p7 32m0s

                        })
                    }
                });
                this.node.destroy();

                break;
            default:
                break;

        }
    }
});
