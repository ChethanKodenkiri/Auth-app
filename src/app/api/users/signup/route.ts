import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody: any = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
     return NextResponse.json({ message: "User already exist" }, { status: 400 });
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    //Save in data base
    const newuser = new User({
      username,
      email,
      password: hashpassword,
    });
    const saveduser = await newuser.save();
    return NextResponse.json(
      {
        message: "User Created successfully",
        succes: true,
        saveduser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
