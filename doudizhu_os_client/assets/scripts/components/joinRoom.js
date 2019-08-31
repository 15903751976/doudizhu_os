import landPop from './landRemovePrefabManage'
cc.Class({
    extends: cc.Component,
    properties: {
        LabelList:{
            default:[],
            type:cc.Label
        },
    },
    onLoad () {
        this.roomIdString = '';
    },
   update (dt) {
        for (let i = 0;i < this.LabelList.length;i++){
            this.LabelList[i].string='';
        }
       for (let i = 0;i < this.roomIdString.length;i++){
           this.LabelList[i].string=this.roomIdString[i];
       }

   },
    onButtonClick:function(event,customData){
        console.log('custom data = ' + customData);
        if(customData === 'close'){
            this.node.destroy();
        }else if(customData === 'clear'){
            this.roomIdString = '';
        }else if(customData === 'back'){
            //this.roomIdString.split(this.roomIdString.length-1,1);//字符串((this.roomIdString.length-1,为保留的长度，即去掉最后一位), (1 为保留字符串的个数))
              this.roomIdString=this.roomIdString.substring(0,this.roomIdString.length-1)
        }else{
           //this.roomIdString += customData;
            let str='';
            str = this.roomIdString;
           str += customData;
           console.log('str = ' + str);
           if(str.length > 6){
             str =  str.substring(0,str.length-1);
           }
            console.log('str.substring = ' + str);
           this.roomIdString = str;
           if(this.roomIdString.length === 6){
               console.log("如果长度等于六，触发加入房间的操作(还要判断6个数对不对，有没有已经存在)");
           }
        }
    },
    // oncloseJoinRoom:function(){
    //     landPop();
    // }
});
