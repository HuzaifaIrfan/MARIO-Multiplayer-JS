var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

    var port=3097

app.get('/', function (req, res) {
res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public/'))



server = http.Server(app);
server.listen(port,()=>{

    console.log("Server running on Port "+port)
});

io = socketIO(server);

io.on('connection', function (socket) {

    var name =""

    socket.on('connected', (gname)=>{
name=gname
socket.broadcast.emit("othermsg",{"name":name,"msg":"Joined"});
console.log(socket.id+" "+name + " Joined")
    });



    socket.on('toserver', (obj)=>{

  socket.broadcast.emit('toothers',{"id":socket.id,"name":name,"frm":obj.frm,"x":obj.x,"y":obj.y});

            });
        
    
            socket.on('sendmsg', (obj)=>{

                console.log(socket.id+" "+name +" : "+obj.msg)
                socket.broadcast.emit("othermsg",obj);
              
                          });
                      
                  



  socket.on('disconnect', ()=>{
    socket.broadcast.emit('distoothers',socket.id);
    socket.broadcast.emit("othermsg",{"name":name,"msg":"Disconnected"});
    console.log(socket.id+" "+name +" Disconnected")
        });

});