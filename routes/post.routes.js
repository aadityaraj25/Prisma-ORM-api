import {Router} from 'express'
import { createPost, deletePost, getPost, getPostById, searchPost, updatePost } from '../controllers/PostController.js'

const postRoute = Router()

postRoute.post("/add",createPost)
postRoute.put("/update/:id",updatePost)
postRoute.get("/",getPost)
postRoute.get("/search",searchPost)
postRoute.get("/:id",getPostById)
postRoute.delete("/delete/:id",deletePost)

export default postRoute 