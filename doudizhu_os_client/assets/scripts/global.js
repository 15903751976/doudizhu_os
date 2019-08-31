import SocketController from './data/socket-controller'
import TianBa from './data/tianba'
const global={};//p1    49m28s    51m46s   57m30s   58m05s
global.socket=SocketController();// global.socket再调用SocketController()方法进行socket.io的进行连接服务器端口，// defines是全局默认IP和端口
global.tianba=TianBa();
export default global;