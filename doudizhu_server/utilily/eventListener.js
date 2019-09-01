exports.EventListener = function (obj) {
    let Register = {};
    obj.on = function(type,method){
        console.log('on = ' + type)
        if (Register.hasOwnProperty(type)){
            Register[type].push(method);
        }else{
            Register[type] = [method];
        }
    };
    obj.fire = function(type){
        //arguments = [type,type2,type3];
        console.log('fire = ' + type)
       if(Register.hasOwnProperty(type)){
           let handlerLister = Register[type];
           for (let i=0;i<handlerLister.length;i++){
               let handler = handlerLister[i];
               let args = [];
               for (let i=1;arguments.length;i++){
                    args.push(arguments[i]);
               }
               handler.apply(this,args);
           }
       }
    }
    obj.removeListens = function(){

    };
    obj.removeAllListeners = function(){

    };
    return obj;
};