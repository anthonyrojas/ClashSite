module.exports = (io)=>{  
    // Set socket.io listeners.
    io.on('connection', (socket) => {
      //console.log('a user connected');
      socket.on('new message', (msg)=>{
        io.emit('new message', msg);
      });
    });
  }