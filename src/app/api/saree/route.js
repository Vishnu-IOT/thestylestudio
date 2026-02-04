import { connectDB } from "@/lib/mongodb";
import Saree from "@/models/saree";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// GET – fetch all sarees
export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 8;
    const skip = (page - 1) * limit;

    const sarees = await Saree.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Saree.countDocuments();

    return NextResponse.json({
        sarees,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    });
}

// POST – add saree
export async function POST(req) {
    await connectDB();

    const formData = await req.formData();

    const image = formData.get("image");
    const name = formData.get("name");
    const desc = formData.get("desc");
    const discount = Number(formData.get("discount"));
    const price = Number(formData.get("price"));
    const category = formData.get("category");

    if (!image) {
        return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    // Create unique filename
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `saree-${Date.now()}-${image.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(uploadPath, buffer);

    const imagePath = `/uploads/${fileName}`;

    // Save to MongoDB
    const saree = await Saree.create({
        name,
        desc,
        discount,
        price,
        category,
        image: imagePath,
    });

    return NextResponse.json(saree);
}

// PUT – update saree
export async function PUT(req) {
    await connectDB();
    const { id, ...data } = await req.json();
    const updated = await Saree.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
}

// DELETE – delete saree
export async function DELETE(req) {
    await connectDB();
    const { id } = await req.json();
    await Saree.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
