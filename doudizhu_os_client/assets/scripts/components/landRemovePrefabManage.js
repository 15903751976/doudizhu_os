let landPop=function () {
    let joinRoom=cc.find('Canvas/prefabs/joinRoom');
    if (joinRoom.childrenCount > 0){
        //joinRoom.removeAllChildren();
        joinRoom.destroyAllChildren();
    };
};
export  default  landPop;