// import prisma from "../config/db.js"
import { AnyNull } from "@prisma/client/runtime/client"
import prisma from "../config/db.js"

// Basic Crud Operation

// create-user
export const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // Check if email already exists
        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (findUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully"
        });

    } catch (error) {
        console.error("Create User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// get-user
export const getUser = async (req, res) => {
    try {
        const userData = await prisma.user.findMany({
            // include:{
                // post:true,  // to get all the data of the post
            // }

            // to get the selected data from the post
            // include:{
            //     post:{
            //         select:{
            //             title:true,
            //             description:true,
            //             comment_count:true,
            //         }
            //     }
            // }

            // to get the post and comment count
            select:{
                _count:{
                    select:{
                        post:true,
                        comment:true
                    }
                }
            }
        });
        // Check if no users exist
        if (!userData || userData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }
        return res.status(200).json({
            success: true,
            count: userData.length,
            data: userData,
            message: "Users fetched successfully"
        });

    } catch (error) {
        console.error("Error fetching users:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// get user by Id
export const getUserById = async(req,res)=>{
    try {
        const userId = req.params.id
        const user = await prisma.user.findUnique({
            where:{
                id:Number(userId)
            },
            include:{
                post:true,
            }
        })
        if(!user){
            return res.status(404).json({message:"User not Found or Does not exist"})
        }

        return res.status(200).json({data:user,message:"User Fetched Succesfully"})
    } catch (error) {
        console.error("Create User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// update-user
export const updateUser = async(req,res)=>{
    const userId = req.params.id
    const {name,email,password} = req.body

    const updatedUser = await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
            name,
            email,
            password
        }
    })

    res.status(200).json({data: updatedUser, message:"User updated successfully"})
}

// delete user
export const deleteUser = async(req,res) => {
    try {
        const userId = Number(req.params.id)
        const user = await prisma.user.delete({
            where:{
                id:userId
            }
        })
        if(!user){
            return res.status(404).json({message:"User not Found or Does not exist"})
        }

        return res.status(200).json({data:user, message:"User Deleted Successfully"})
    } catch (error) {
        console.error("Create User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
    
}