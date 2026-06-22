import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/user.routes.js'
import postRoute from './routes/post.routes.js'
import commentRoute from './routes/comment.routes.js'

const app = express()

const PORT = process.env.PORT || 3000

dotenv.config()
app.use(express.json())
// app.use(express.urlencoded({extended:false}))

// routes
app.use("/api/user",userRoute)
app.use("/api/post",postRoute)
app.use("/api/comment",commentRoute)

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})