// import prisma from "../config/db.js"
import { AnyNull } from "@prisma/client/runtime/client"
import prisma from "../config/db.js"
// Basic Crud Operation

// create-post
export const createPost = async (req, res) => {
    try {
        const { user_id, title,description } = req.body
        const newPost = await prisma.post.create({
            data:{
                user_id:Number(user_id),
                title,
                description   
            }
        })

        return res.status(200).json({data:newPost, message:"Posts Created Successfully"})

    } catch (error) {
        console.error("Create Post Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// get-post
export const getPost = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10;

        if(page<= 0){
            page = 1
        }
        if(limit<=0 || limit>100){
            limit=10
        }

        const skip = (page-1)*limit
        const posts = await prisma.post.findMany({
            skip:skip, // this is called Pagination
            include:{
                comment:{
                    include:{
                        user:{
                            select:{
                                name:true,
                                email:true
                            }
                        }
                    }
                }
            },
            orderBy:{
                created_at:"desc"
            },

            // filter on the basis of no of comment
            // where:{
            //     comment_count:{
            //         gt:0,
            //     }
            // },
            // // filter on the basis of title
            // where:{
            //     title:{
            //         startsWith:"Random Word"
            //     }
            // }
        })

        // to get the total count
        const totalPost = await prisma.post.count()
        const totalPages = Math.ceil(totalPost/limit)

        return res.status(200).json({data:posts, message:"Posts Fetched Successfully",
            meta:{
            totalPages,
            currenPage:page,
            limit
        }})
    } catch (error) {
        console.error("Error fetching Posts:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// get post by Id
export const getPostById = async(req,res)=>{
    try {
        const postId = req.params.id 
        const post = await prisma.post.findFirst({
            where:{
                id:Number(postId),
            }
        })
        if(!post){
            return res.status(404).json({message:"Post not Found or Does not exist"})
        }
        return res.status(200).json({data:post, message:"Post Fetched Successfully"})
    } catch (error) {
        console.error("Create Post Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// update post
export const updatePost = async(req,res)=>{
    try {
        const postId = req.params.id
        const { title,description } = req.body
        const post = await prisma.post.update({
            where:{
                id:Number(postId),
            },
            data:{
                title,
                description
            }
        })
        if(!post){
            return res.status(404).json({message:"Post not Found or Does not exist"})
        }
        return res.status(200).json({data:post, message:"Post Updated Successfully"})

    } catch (error) {
        console.error("Create Post Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// delete post
export const deletePost = async(req,res) => {
    try {
        const postId = Number(req.params.id)
        const post = await prisma.post.delete({
            where:{
                id:postId
            }
        })
        if(!post){
            return res.status(404).json({message:"Post not Found or Does not exist"})
        }
        return res.status(200).json({data:post, message:"Post Deleted Successfully"})

    } catch (error) {
        console.error("Create Post Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
    
} 


// search post based on the text entered of the description
export const searchPost = async(req ,res) => {
    const query = req.query.q
    const posts = await prisma.post.findMany({
        where:{
            description:{
                search:query    
            }
        }
    })
    return res.json({status:200, message:"Post Seached Successfully", data:posts})
}