import { connect } from "@dbconfig/dbConfig";
import User from "@models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check  user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Does Not Exist" },
        { status: 400 }
      );
    }
    // check if password is correct 
    const validPassword = await bcrypt .compare(password,user.password)

    if(!validPassword){
        return NextResponse.json({error:"Invalid Password or Password Not Matching"},{status:400})
    }

    // creating  token data 
    const tokenData = {
        id:user._id,
        email:user.email,
        username:user.username
        }
    // create token w/ jwt
     const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1hr" }) //token created w/ this now needed to add into cookies 
//token created w/ this now needed to add into cookies 

    //To create the cookies we hv to make a NextResponse then we can set cookies of user
    const response = NextResponse.json({message:"login Successfully"}, {status:200})

    response.cookies.set("token",
        token,
       { httpOnly:true,
        }
    )
    return response;

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        "Login wale routes wale file me issue aya hai !",
        error.message
      );
      return NextResponse.json(
        {error:error.message},
        {status: 500});
    }
  }
}
