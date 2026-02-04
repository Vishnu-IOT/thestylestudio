import { connectDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

// GET – fetch all Category
export async function GET() {
    await connectDB();
    const category = await Category.find();
    return NextResponse.json(category);
}
// POST - add Category
export async function POST(req) {
    await connectDB();
    const data = await req.json();
    const saree = await Category.create(data);
    return NextResponse.json(saree);
}

// DELETE - delete Category
export async function DELETE(req) {
    await connectDB();
    const { id } = await req.json();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
