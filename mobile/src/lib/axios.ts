import axios from "axios";

export const api = axios.create({
    baseURL:'http://192.168.1.24:3333' // Coloque o seu ip da máquina aqui
})