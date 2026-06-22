import {Router} from 'express'
import { CreateUser, deleteUser, getUser, getUserById, updateUser } from '../controllers/user.controllers.js'

const userRoute = Router()

userRoute.post("/add",CreateUser)
userRoute.put("/update/:id",updateUser)
userRoute.get("/",getUser)
userRoute.get("/:id",getUserById)
userRoute.delete("/delete/:id",deleteUser)

export default userRoute