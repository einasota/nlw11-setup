import Fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/', async (request, response) => {
    const habits = await prisma.habit.findMany()
    return response.status(200).send(habits)
})

app.listen({
    port: 3333,
}).then(() => {
    console.log("Server is Running in http://localhost:3333")
})