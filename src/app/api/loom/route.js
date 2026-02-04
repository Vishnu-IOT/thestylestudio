import { connectDB } from "@/lib/mongodb";
import Saree from "@/models/saree";
import { NextResponse } from "next/server";

// GET – fetch all sarees
export async function GET() {
    await connectDB();
    const sarees = await Saree.find();
    return NextResponse.json(sarees);
}

// PUT – update saree
export async function PUT(req) {
    await connectDB();
    const { id, ...data } = await req.json();
    const updated = await Saree.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
}
