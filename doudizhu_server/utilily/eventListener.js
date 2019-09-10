exports.EventListener = function (obj) {//p6 28m20s
    let Register = {};
    obj.on = function(type,method){
            console.log('on = ' + type)
        if (Register.hasOwnProperty(type)){
            Register[type].push(method);
        }else{
            Register[type] = [method];
        }
    };
    obj.fire = function(type){//p6 20m27s
        //arguments = [type,type2,type3];
        console.log('fire = ' + type)
       if(Register.hasOwnProperty(type)){
           let handlerList = Register[type];
           for (let i=0;i<handlerList.length;i++){
               let handler = handlerList[i];
               let args = [];
               for (let j = 1;arguments.length;j++){
                    args.push(arguments[i]);
               }
               handler.apply(this,args);//p6 21m50s
           }
       }
    };//p6 24m10s
    obj.removeListener = function(){

    };
    obj.removeAllListeners = function(){

    };
    return obj;
};