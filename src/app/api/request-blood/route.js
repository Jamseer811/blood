import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Donor from "@/models/Donor";
import BloodRequest from "@/models/BloodRequest";
import { transporter } from "@/utils/mailer";

const nearbyAreas = {
  Gandhipuram: [
    "Gandhipuram",
    "RS Puram",
    "Saibaba Colony",
    "Ganapathy",
    "Town Hall",
  ],
  Singanallur: [
    "Singanallur",
    "Peelamedu",
    "Ramanathapuram",
    "Ondipudur",
  ],
  Peelamedu: [
    "Peelamedu",
    "Singanallur",
    "Ganapathy",
    "Ramanathapuram",
  ],
  "RS Puram": [
    "RS Puram",
    "Gandhipuram",
    "Saibaba Colony",
  ],
  "Saibaba Colony": [
    "Saibaba Colony",
    "RS Puram",
    "Gandhipuram",
  ],
  Ganapathy: [
    "Ganapathy",
    "Gandhipuram",
    "Peelamedu",
  ],
  Ukkadam: [
    "Ukkadam",
    "Town Hall",
  ],
  "Town Hall": [
    "Town Hall",
    "Ukkadam",
    "Gandhipuram",
  ],
  Ramanathapuram: [
    "Ramanathapuram",
    "Peelamedu",
    "Singanallur",
  ],
};

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const patientName = body.patientName?.trim();
    const patientEmail = body.patientEmail?.trim();
    const bloodGroup = body.bloodGroup?.trim();
    const city = body.city?.trim() || "Coimbatore";
    const area = body.area?.trim();
    const hospital = body.hospital?.trim();
    const contact = body.contact?.trim();

    const searchAreas = nearbyAreas[area] || [area];

    const donors = await Donor.find({
      bloodGroup,
      area: {
        $in: searchAreas,
      },
      available: true,
    });

    const request = await BloodRequest.create({
      patientName,
      patientEmail,
      bloodGroup,
      city,
      area,
      hospital,
      contact,
      matchedDonors: donors.length,
      status: "Pending",
      donorResponses: [],
    });

    let donorEmailsSent = 0;
    let patientEmailSent = 0;
    let emailErrors = [];

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      for (const donor of donors) {
        try {
          const availableLink = `${baseUrl}/api/donor-response?requestId=${request._id}&donorId=${donor._id}&response=available`;

          const notAvailableLink = `${baseUrl}/api/donor-response?requestId=${request._id}&donorId=${donor._id}&response=not-available`;

          await transporter.sendMail({
            from: `"LifeLink Blood Portal" <${process.env.EMAIL_USER}>`,
            to: donor.email,
            subject: `🩸 Urgent Blood Required - ${bloodGroup}`,
            html: `
              <div style="font-family:Arial,sans-serif;background:#f3f4f6;padding:20px;">
                <div style="max-width:650px;margin:auto;background:#ffffff;padding:25px;border-radius:12px;">
                  <h2 style="color:#dc2626;text-align:center;">
                    🩸 Blood Donation Request
                  </h2>

                  <p>Hello <b>${donor.name}</b>,</p>

                  <p>A patient urgently requires blood near your area.</p>

                  <hr />

                  <h3 style="color:#dc2626;">Patient Details</h3>

                  <p><b>Patient Name:</b> ${patientName}</p>
                  <p><b>Patient Email:</b> ${patientEmail}</p>
                  <p><b>Blood Group:</b> ${bloodGroup}</p>
                  <p><b>Hospital:</b> ${hospital}</p>
                  <p><b>Area:</b> ${area}</p>
                  <p><b>Contact Number:</b> ${contact}</p>

                  <hr />

                  <h3 style="color:#dc2626;">
                    Would you like to donate blood?
                  </h3>

                  <div style="margin-top:20px;margin-bottom:20px;">
                    <a href="${availableLink}"
                      style="background:#16a34a;color:white;padding:12px 18px;text-decoration:none;border-radius:8px;display:inline-block;margin:5px;">
                      Yes, I am ready to donate
                    </a>

                    <a href="${notAvailableLink}"
                      style="background:#dc2626;color:white;padding:12px 18px;text-decoration:none;border-radius:8px;display:inline-block;margin:5px;">
                      Not available now
                    </a>
                  </div>

                  <p>
                    Your response will be shown to the admin dashboard.
                  </p>

                  <div style="background:#fee2e2;padding:15px;border-radius:10px;text-align:center;margin-top:20px;">
                    <strong>Your donation can save a life ❤️</strong>
                  </div>

                  <br />

                  <p>
                    Thank you,
                    <br />
                    <b>LifeLink Blood Donation Portal</b>
                  </p>
                </div>
              </div>
            `,
          });

          donorEmailsSent++;
        } catch (error) {
          emailErrors.push({
            type: "Donor Email Failed",
            email: donor.email,
            error: error.message,
          });
        }
      }

      try {
        const donorRows =
          donors.length > 0
            ? donors
                .map(
                  (donor, index) => `
                    <tr>
                      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
                        ${index + 1}
                      </td>
                      <td style="padding:10px;border:1px solid #ddd;">
                        ${donor.name}
                      </td>
                      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
                        ${donor.bloodGroup}
                      </td>
                      <td style="padding:10px;border:1px solid #ddd;">
                        ${donor.area}
                      </td>
                      <td style="padding:10px;border:1px solid #ddd;text-align:center;">
                        ${donor.phone}
                      </td>
                      <td style="padding:10px;border:1px solid #ddd;">
                        ${donor.email}
                      </td>
                    </tr>
                  `
                )
                .join("")
            : `
              <tr>
                <td colspan="6" style="padding:15px;border:1px solid #ddd;text-align:center;color:#dc2626;">
                  No matching donors found currently.
                </td>
              </tr>
            `;

        await transporter.sendMail({
          from: `"LifeLink Blood Portal" <${process.env.EMAIL_USER}>`,
          to: patientEmail,
          subject: `🩸 Matching Donor List - ${bloodGroup}`,
          html: `
            <div style="font-family:Arial,sans-serif;background:#f3f4f6;padding:20px;">
              <div style="max-width:800px;margin:auto;background:#ffffff;padding:25px;border-radius:12px;">
                <h2 style="color:#dc2626;text-align:center;">
                  🩸 Matching Blood Donor List
                </h2>

                <p>Hello <b>${patientName}</b>,</p>

                <p>
                  Your blood request has been received successfully.
                  Below are the available matching donors near your selected area.
                </p>

                <div style="background:#fee2e2;padding:15px;border-radius:10px;margin:20px 0;">
                  <p><b>Requested Blood Group:</b> ${bloodGroup}</p>
                  <p><b>Hospital:</b> ${hospital}</p>
                  <p><b>Requested Area:</b> ${area}</p>
                  <p><b>Contact Number:</b> ${contact}</p>
                  <p><b>Matched Donors:</b> ${donors.length}</p>
                </div>

                <table style="width:100%;border-collapse:collapse;margin-top:20px;">
                  <thead>
                    <tr style="background:#dc2626;color:white;">
                      <th style="padding:10px;border:1px solid #ddd;">S.No</th>
                      <th style="padding:10px;border:1px solid #ddd;">Name</th>
                      <th style="padding:10px;border:1px solid #ddd;">Blood Group</th>
                      <th style="padding:10px;border:1px solid #ddd;">Area</th>
                      <th style="padding:10px;border:1px solid #ddd;">Phone</th>
                      <th style="padding:10px;border:1px solid #ddd;">Email</th>
                    </tr>
                  </thead>

                  <tbody>
                    ${donorRows}
                  </tbody>
                </table>

                <p style="margin-top:25px;">
                  Please contact the donors politely and confirm their availability before visiting the hospital.
                </p>

                <p>
                  Thank you,
                  <br />
                  <b>LifeLink Blood Donation Portal</b>
                </p>
              </div>
            </div>
          `,
        });

        patientEmailSent = 1;
      } catch (error) {
        emailErrors.push({
          type: "Patient Email Failed",
          email: patientEmail,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message:
        donors.length > 0
          ? "Blood request created. Donor emails sent and donor list sent to patient email."
          : "Blood request created but no matching donors found.",
      matchedDonors: donors.length,
      donorEmailsSent,
      patientEmailSent,
      emailErrors,
      searchedAreas: searchAreas,
      donorDetails: donors,
      request,
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

export async function GET() {
  try {
    await connectDB();

    const requests = await BloodRequest.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: requests,
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

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Request ID is required",
        },
        { status: 400 }
      );
    }

    const request = await BloodRequest.findByIdAndUpdate(
      id,
      {
        status: body.status,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Request status updated successfully",
      data: request,
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
          message: "Request ID is required",
        },
        { status: 400 }
      );
    }

    await BloodRequest.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Blood request deleted successfully",
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