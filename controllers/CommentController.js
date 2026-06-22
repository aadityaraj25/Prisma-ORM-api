// import prisma from "../config/db.js"
import { AnyNull } from "@prisma/client/runtime/client"
import prisma from "../config/db.js"
// Basic Crud Operation

// create-post
export const createComment = async (req, res) => {
    try {
        const { user_id, post_id, comment } = req.body
        const newComment = await prisma.comment.create({
            data:{
                user_id:Number(user_id),
                post_id:Number(post_id),
                comment
            }
        })

        // increment comment count in post table
        await prisma.post.update({
            where:{
                id:Number(post_id)
            },
            data:{
                comment_count:{
                    increment:1
                }
            }
        })

        return res.status(200).json({data:newComment, message:"Comment Created Successfully"})
    } catch (error) {
        console.error("Create Comment Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// get-comments
export const getComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include:{
                user:true,
                post:{
                    include:{
                        user:true,
                    }
                }   
            }
        })
        return res.status(200).json({data:comments, message:"Comments Fetched Successfully"})
    } catch (error) {
        console.error("Error fetching Comments:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// get comment by Id
export const getCommentById = async(req,res)=>{
    try {
        const commentId = req.params.id 
        const comment = await prisma.comment.findFirst({
            where:{
                id:Number(commentId),
            }
        })
        if(!comment){
            return res.status(404).json({message:"Comment not Found or Does not exist"})
        }
        return res.status(200).json({data:comment, message:"Comment Fetched Successfully"})
    } catch (error) {
        console.error("Get Comment Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// update comment
export const updateComment = async(req,res)=>{
    try {
        const commentId = req.params.id
        const { comment } = req.body
        const updatedComment = await prisma.comment.update({
            where:{
                id:Number(commentId),
            },
            data:{
                comment,
            }           
        })
        if(!updatedComment){
            return res.status(404).json({message:"Comment not Found or Does not exist"})
        }
        return res.status(200).json({data:updatedComment, message:"Comment Updated Successfully"})

    } catch (error) {
        console.error("Update Comment Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// delete comment
export const deleteComment = async(req,res) => {
    try {
        const commentId = req.params.id
        const comment = await prisma.comment.delete({
            where:{
                id:commentId
            }
        })
        if(!comment){
            return res.status(404).json({message:"Comment not Found or Does not exist"})
        }

        // decrement comment count in post table
        await prisma.post.update({
            where:{
                id:Number(comment.post_id)
            },
            data:{
                comment_count:{
                    decrement:1
                }
            }
        })

        return res.status(200).json({data:comment, message:"Comment Deleted Successfully"})

    } catch (error) {
        console.error("Delete Comment Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
    
} 

// search comment based on the text entered of the description
export const searchComment = async(req ,res) => {
    const query = req.query.q
    const comments = await prisma.comment.findMany({
        where:{
            comment:{
                search:query
            }
        }
    })
    return res.json({status:200, message:"Comment Searched Successfully", data:comments})
}   