import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
        message:"logout Successfully",
        status:200 ,
        success:true
    });

    response.cookies.set("token","",{httpOnly:true, expires: new Date(0)})
    return response;
} catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "error in making user logout." },
        {
          status: 500,
        }
      );
    }
  }
}
