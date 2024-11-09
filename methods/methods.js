import Model from '../model/model.js'
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken"
const jwtkey = "abcdefghijklmnopqrstuvwxyz12345"


export const signup = async (req, res) => {
    const { name, email,phone, password, role } = req.body;
    try {
        const user = await Model.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Model({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            role: role
        })
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}




export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Model.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const ismatch = await bcrypt.compare(password, user.password)

        if (user.role !== "user" && user.role !== "admin") {
            return res.status(403).json({ message: `user with ${user.role} is not found` });
        }


        if (!ismatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        jwt.sign({ id: user.id }, jwtkey, { expiresIn: "1d" }, (error, token) => {
            if (error) {
                return res.json({ message: "token Error", error: error.message });
            }

            res.cookie('token', token, {
                // httpOnly:true, // Only allow access via HTTP
                secure: true, 
                sameSite: 'None' 
            });
            res.json({
                message: 'Logged in successfully',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const getmyprofile = (req, res) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User profile fetched successfully", user:{
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        } });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const additionaldata = async (req, res) => {
    const { comment_data, rating } = req.body;
    try {
        const name = req.user.name;
        const email = req.user.email;
        const Model = new Model({
            comment_data: comment_data,
            rating: rating,
            name: name,
            email: email,
        });
        await Model.save();
        res.status(201).json({ message: "Data added successfully", data: newComment });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Failed to add data", error: error.message });
    }
};


export const getallusers = async (req, res) => {
    try {
        const allusers = await Model.find();
        if(!allusers){
            return res.status(404).json({ message: "No users found" });
        }
        res.json({ message: "All users fetched successfully", users: allusers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}




export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.json({ message: "Token not found" });
        }
        res.clearCookie('token');
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        
    }
}

export const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Model.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
