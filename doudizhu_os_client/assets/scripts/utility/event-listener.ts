const EventListener = function(obj){//模拟类的概念 p7 0m00s
  let that = {};
  let Register = {};
  obj.on = function(type,method){
      if (Register.hasOwnProperty(type)) {
          Register[type].push(method);
      }else{
          Register[type] = [method];
      }
  };
  obj.fire = function(type){//p7 7m00s
    if (Register.hasOwnProperty(type)) {
        let handlerList = Register[type];
        for (let i=0;i<handlerList.length;i++){
            let handler = handlerList[i];
            let args = [];
            for (let j = 1;j<arguments.length;j++){
                args.push(arguments[i]);
            }
        }
    }
  };
  return obj;
};
export  default EventListener;