import { connect } from "@dbconfig/dbConfig";
import User from "@models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();//getting the data from the axios api by NextRequest.json()  
        const { username, email, password } = reqBody;
        console.log(reqBody);

        // check if user already exist 
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User Already Exists" }, { status: 400 })
        }
        // hash Password 
        // salt{random string} added for additional security 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email: email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser);

        return (NextResponse.json({
            message: "User Created Successfully",
            success:true,
            savedUser
            },{status:200}))
   
    
    
    } catch (error: unknown) {
            if( error instanceof Error){
                console.log("Error while createing new user / saved user ", error.message);
             return NextResponse.json({
               status:500
            })
            }
            
    }
}
