import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Donor from "@/models/Donor";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.age || Number(body.age) < 18) {
      return NextResponse.json(
        {
          success: false,
          message: "Donor must be at least 18 years old",
        },
        { status: 400 }
      );
    }

    if (!body.gender) {
      return NextResponse.json(
        {
          success: false,
          message: "Gender is required",
        },
        { status: 400 }
      );
    }

    const donor = await Donor.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      bloodGroup: body.bloodGroup,
      city: body.city || "Coimbatore",
      area: body.area,
      age: Number(body.age),
      gender: body.gender,
      lastDonationDate: body.lastDonationDate || null,
      available: true,
    });

    return NextResponse.json({
      success: true,
      message: "Donor registered successfully",
      data: donor,
    });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or phone already registered",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const donors = await Donor.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: donors,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const body = await req.json();

    const donor = await Donor.findByIdAndUpdate(
      id,
      {
        name: body.name,
        phone: body.phone,
        bloodGroup: body.bloodGroup,
        area: body.area,
        available: body.available,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Donor updated successfully",
      data: donor,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Donor ID is required",
        },
        { status: 400 }
      );
    }

    await Donor.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Donor deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}