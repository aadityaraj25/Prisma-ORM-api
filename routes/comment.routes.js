import {Router} from 'express'
import { createComment, deleteComment, getCommentById, getComments, searchComment, updateComment } from '../controllers/CommentController.js'

const commentRoute = Router()

commentRoute.post("/add",createComment)
commentRoute.put("/update/:id",updateComment)
commentRoute.get("/",getComments)
commentRoute.get("/search",searchComment)
commentRoute.get("/:id",getCommentById)
commentRoute.delete("/delete/:id",deleteComment)

export default commentRoute