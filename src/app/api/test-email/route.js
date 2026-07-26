import { NextResponse } from "next/server";
import { transporter } from "@/utils/mailer";

export async function GET() {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "LifeLink Test Email",
      text: "Email working successfully",
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}