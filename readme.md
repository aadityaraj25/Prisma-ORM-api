prisma.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma

user.controller.js
import prisma from '../config/prisma.js'
const users = await prisma.user.findMany()


post.controller.js
import prisma from '../config/prisma.js'
const posts = await prisma.post.findMany()

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
})