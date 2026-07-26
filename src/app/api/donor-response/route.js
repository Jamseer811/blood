import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Donor from "@/models/Donor";
import BloodRequest from "@/models/BloodRequest";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const requestId = searchParams.get("requestId");
    const donorId = searchParams.get("donorId");
    const response = searchParams.get("response");

    const donor = await Donor.findById(donorId);

    if (!donor) {
      return new Response("Donor not found");
    }

    const finalResponse =
      response === "available"
        ? "Available"
        : "Not Available";

    await BloodRequest.findByIdAndUpdate(requestId, {
      $pull: {
        donorResponses: {
          donorId: donorId,
        },
      },
    });

    await BloodRequest.findByIdAndUpdate(requestId, {
      $push: {
        donorResponses: {
          donorId: donor._id.toString(),
          donorName: donor.name,
          donorEmail: donor.email,
          donorPhone: donor.phone,
          response: finalResponse,
          respondedAt: new Date(),
        },
      },
    });

    return new Response(`
      <html>
        <body style="font-family:Arial;text-align:center;padding:50px;">
          <h2>Thank you, ${donor.name}</h2>
          <p>Your response has been recorded as:</p>
          <h1 style="color:#dc2626;">${finalResponse}</h1>
          <p>You may close this page.</p>
        </body>
      </html>
    `, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}