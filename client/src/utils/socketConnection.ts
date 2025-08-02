import { io } from "socket.io-client";
const socket=io("https://82e03ec80690.ngrok-free.app");

export function connectSocket(){
    socket.connect();
}

export function sendMovement(stepsId:string){
    socket.emit("movement",stepsId);
}

export function sendMidnight(){
    socket.emit("midnight");
}