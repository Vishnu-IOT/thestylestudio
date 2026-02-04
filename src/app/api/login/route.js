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
        const { email, emailVerified } = await req.json();

        if (!emailVerified) {
            return NextResponse.json(
                { message: "Email not verified" },
                { status: 403 }
            );
        }

        const user = await Register.findOne({ uid: decoded.uid });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            datas: [user],
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Login failed" },
            { status: 500 }
        );
    }
}
