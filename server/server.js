const express = require('express');
const { Server: WebSocketServer } = require('ws');
const http = require('http');
const cors = require('cors');

const {GetExternalData} = require('./process');


const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });


let chatRooms = []; // Array to store chat rooms

// Middlewares and utilities
app.use(express.json()); // To parse JSON body
app.use(cors());

// HTTP Routes
app.get('/chat-rooms', (req, res) => {
    res.json(chatRooms);
});

app.post('/create-chat-room', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send("Name is required");
    }
    if (chatRooms.includes(name)) {
        return res.status(400).send("Chat room already exists");
    }
    chatRooms.push(name);
    res.status(201).send("Chat room created");
});

app.delete('/delete-chat-room', (req, res) => {
    const { name } = req.body;
    chatRooms = chatRooms.filter(room => room !== name);
    res.send("Chat room deleted");
});

app.get('/get-chat-room/:name', (req, res) => {
    const { name } = req.params;
    const room = chatRooms.find(room => room === name);
    if (room) {
        res.json({ name: room });
    } else {
        res.status(404).send("Chat room not found");
    }
});

const processingTime = 20000; // 5 seconds in milliseconds
const updateFrequency = 1000; // 1 second in milliseconds
    const totalUpdates = processingTime / updateFrequency;
    const progressIncrement = 100 / totalUpdates;

    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');
    
        ws.on('error', console.error);
    
        ws.on('message', async (data) => {
            // console.log('received:', data);
            const parsedData = JSON.parse(data);
            // console.log(parsedData);
    
            let progress = 0;
    
            // Immediately start fetching external data
            const response = await GetExternalData(parsedData?.message);
            // console.log("response", response);
            const parsedResponse = JSON.parse(response);

            const interval = setInterval(() => {
                progress += progressIncrement;
    
                // Send progress update
                const progressResponse = {
                    id: parsedData?.id,
                    type: 'server_update',
                    message: `${parsedData?.message}`,
                    update: `Server is processing... ${100 - progress}% remaining`
                };
                ws.send(JSON.stringify(progressResponse));
    
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, updateFrequency);
    
            setTimeout(() => {
                clearInterval(interval); // Stop sending progress updates
    
                // Send completed message
                const completionResponse = {
                    id: parsedData?.id,
                    type: 'server_response',
                    message: `You ${parsedData?.message}`,
                    server: { response: `${parsedResponse?.text}` }
                };
                ws.send(JSON.stringify(completionResponse));
            }, processingTime);
        });
    });
    



server.on('upgrade', (request, socket, head) => {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
    console.log("Incoming request:", pathname);
    if (pathname.startsWith('/ws/')) {
        wss.handleUpgrade(request, socket, head, (ws) => {
            console.log(pathname, "connected");
            wss.emit('connection', ws, request);
        });
    } else {
        console.log("Rejected request for:", pathname);
        socket.destroy();
    }
});



server.listen(8080, () => {
    console.log('Server started on port 8080');
});
