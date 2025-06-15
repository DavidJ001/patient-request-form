import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // Create email content
    let emailBody = `NEW APPOINTMENT BOOKING REQUEST\n\n`;
    
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
    emailBody += `Has Referral: ${formData.hasReferral ? 'Yes' : 'No'}\n\n`;
    
    emailBody += `Submitted on: ${new Date().toLocaleString()}\n`;

    // For now, we'll simulate sending the email and log the content
    console.log("Email content to be sent:");
    console.log(emailBody);
    
    // Since we don't have Resend configured, we'll return success but log the email content
    // In a real implementation, you would need to:
    // 1. Set up a Resend API key in Supabase secrets
    // 2. Import and use the Resend library
    
    // Simulate email sending
    const emailData = {
      to: "appointments@premierfamilyclinics.co.ke",
      from: "noreply@premierfamilyclinics.co.ke",
      subject: `New Appointment Request - ${formData.fullName}`,
      content: emailBody,
      timestamp: new Date().toISOString()
    };

    console.log("Simulated email sent:", emailData);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Appointment request received and logged",
      emailContent: emailBody 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error processing appointment request:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to process appointment request"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);