
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentEmailRequest {
  formData: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData }: AppointmentEmailRequest = await req.json();
    
    console.log("Received appointment request:", formData);

    const formatDate = (date: string | undefined) => {
      return date ? new Date(date).toLocaleDateString() : 'Not specified';
    };

    let emailBody = `APPOINTMENT BOOKING REQUEST\n\n`;
    
    emailBody += `PERSONAL INFORMATION:\n`;
    emailBody += `Full Name: ${formData.fullName}\n`;
    emailBody += `Date of Birth: ${formatDate(formData.dateOfBirth)}\n`;
    emailBody += `Gender: ${formData.gender}\n`;
    emailBody += `Phone Number: ${formData.phoneNumber}\n`;
    emailBody += `Email Address: ${formData.emailAddress}\n\n`;
    
    emailBody += `APPOINTMENT DETAILS:\n`;
    emailBody += `Service: ${formData.service}\n`;
    emailBody += `Preferred Date: ${formatDate(formData.preferredDate)}\n`;
    emailBody += `Preferred Time: ${formData.preferredTime}\n`;
    emailBody += `Preferred Doctor: ${formData.preferredDoctor || 'No preference'}\n\n`;
    
    emailBody += `PATIENT INFORMATION:\n`;
    emailBody += `Appointment for self: ${formData.isForSelf ? 'Yes' : 'No'}\n`;
    if (!formData.isForSelf) {
      emailBody += `Patient Name: ${formData.patientName}\n`;
      emailBody += `Patient Age: ${formData.patientAge}\n`;
      emailBody += `Relationship to Patient: ${formData.relationshipToPatient}\n`;
    }
    emailBody += `\n`;
    
    emailBody += `ADDITIONAL INFORMATION:\n`;
    emailBody += `Reason for Visit: ${formData.reasonForVisit || 'Not specified'}\n`;
    emailBody += `Has Referral: ${formData.hasReferral ? 'Yes' : 'No'}\n`;

    const emailResponse = await resend.emails.send({
      from: "Premier Family Clinics <onboarding@resend.dev>",
      to: ["appointments@premierfamilyclinics.co.ke"],
      reply_to: formData.emailAddress,
      subject: `New Appointment Request - ${formData.fullName}`,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Appointment Booking Request</h2>
          
          <h3 style="color: #059669;">Personal Information</h3>
          <p><strong>Full Name:</strong> ${formData.fullName}</p>
          <p><strong>Date of Birth:</strong> ${formatDate(formData.dateOfBirth)}</p>
          <p><strong>Gender:</strong> ${formData.gender}</p>
          <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
          <p><strong>Email Address:</strong> ${formData.emailAddress}</p>
          
          <h3 style="color: #059669;">Appointment Details</h3>
          <p><strong>Service:</strong> ${formData.service}</p>
          <p><strong>Preferred Date:</strong> ${formatDate(formData.preferredDate)}</p>
          <p><strong>Preferred Time:</strong> ${formData.preferredTime}</p>
          <p><strong>Preferred Doctor:</strong> ${formData.preferredDoctor || 'No preference'}</p>
          
          <h3 style="color: #059669;">Patient Information</h3>
          <p><strong>Appointment for self:</strong> ${formData.isForSelf ? 'Yes' : 'No'}</p>
          ${!formData.isForSelf ? `
            <p><strong>Patient Name:</strong> ${formData.patientName}</p>
            <p><strong>Patient Age:</strong> ${formData.patientAge}</p>
            <p><strong>Relationship to Patient:</strong> ${formData.relationshipToPatient}</p>
          ` : ''}
          
          <h3 style="color: #059669;">Additional Information</h3>
          <p><strong>Reason for Visit:</strong> ${formData.reasonForVisit || 'Not specified'}</p>
          <p><strong>Has Referral:</strong> ${formData.hasReferral ? 'Yes' : 'No'}</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This appointment request was submitted through the Premier Family Clinics website.</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending appointment email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
