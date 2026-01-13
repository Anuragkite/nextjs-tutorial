import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse} from "next/server";

import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModels";

connect();

export async function GET(request:NextRequest,){
try {
    const userId =  getDataFromToken(request);
    const user = await User.findOne({_id:userId}).select("-password ")
    return NextResponse.json({
        message:"user found",
        data:user
    })

} catch (error) {
    if(error instanceof Error){
       return NextResponse.json({message:error.message},{status:500})
    }
}
}