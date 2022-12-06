import {Server} from "socket.io"
import express from "express"
import * as http from "http";
import cors from "cors"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors())

io.on("connection", (socket) => {
    console.log(`${socket.id} is connected`)
});

io.listen(3001);
