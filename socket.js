import { Server }  from "socket.io";

 export  function createSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

socket.on("join-room",({roomcode})=>{
  let id=socket.id;
 
  socket.join(roomcode);

  socket.emit("joined-room",{roomcode});//used for naviagtion in meet.jsx 
  
  socket.broadcast.to(roomcode).emit("user-joined",{id});
  
})

socket.on("send-signal",({id,offer})=>{
  socket.to(id).emit("incoming-call",({from:socket.id,offer:offer}));

})



socket.on("call-accept",({acceptFrom,answer})=>{
  socket.to(acceptFrom).emit("call-accepted",({answer}));
})

socket.on("ice-candidate",({to,candidate})=>{
  socket.to(to).emit("ice-candidate",({candidate}));
})
/*messages*/

socket.on("message-send", ({ msg, username, roomcode }) => {
  socket.to(roomcode).emit("receivedmessage", {
    msg,
    username,
    from: socket.id
  });
});

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      socket.broadcast.emit("user-left",(socket.id));
    });
  });
}


