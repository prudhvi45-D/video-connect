import {Server} from "socket.io";
const connectToSocket=(server)=>{
    const io=new Server(server);
    io.on("connection",(socket)=>{
        console.log("new connection");
    });
    return io;
};
export default connectToSocket;