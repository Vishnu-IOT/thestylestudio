import { NextResponse } from "next/server";
import admin from "@/firebaseAdmin/adminacc";
import { connectDB } from "@/lib/mongodb";
import Register from "@/models/register";

export async function POST(req) {
    try {
        await connectDB();

        const token = req.headers.get("authorization");
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = await admin.auth().verifyIdToken(token);
        const { name, email, phonenumber, admin } = await req.json();

        // Check duplicate
        const exists = await Register.findOne(
            {
                $or: [
                    { email },
                    { phonenumber }
                ]
            });
        if (exists) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const user = await Register.create({
            uid: decoded.uid,
            name,
            email,
            phonenumber: phonenumber,
            emailverified: decoded.email_verified,
            admin: admin,
        });

        return NextResponse.json({ success: true, user });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Registration failed" },
            { status: 500 }
        );
    }
}

