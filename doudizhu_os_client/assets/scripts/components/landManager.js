let landShow=function (pre) {
        let joinRoom=cc.find('Canvas/prefabs/joinRoom');
        let node = cc.instantiate(pre);
        node.parent = joinRoom;
};
export default  landShow;
