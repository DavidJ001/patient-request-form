
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import PersonalInformation from "./form-sections/PersonalInformation";
import AppointmentDetails from "./form-sections/AppointmentDetails";
import PatientInformation from "./form-sections/PatientInformation";
import AdditionalNotes from "./form-sections/AdditionalNotes";
import ConsentSection from "./form-sections/ConsentSection";
import { FormData } from "@/types/appointment";

const AppointmentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    fullName: "",
    dateOfBirth: undefined,
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    
    // Appointment Details
    service: "",
    preferredDate: undefined,
    preferredTime: "",
    preferredDoctor: "",
    
    // Patient Information
    isForSelf: true,
    patientName: "",
    patientAge: "",
    relationshipToPatient: "",
    
    // Additional Notes
    reasonForVisit: "",
    hasReferral: false,
    referralDocument: null,
    
    // Consent
    agreeToTerms: false
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const formatEmailBody = (data: FormData): string => {
    const formatDate = (date: Date | undefined) => {
      return date ? date.toLocaleDateString() : 'Not specified';
    };

    let emailBody = `APPOINTMENT BOOKING REQUEST\n\n`;
    
    emailBody += `PERSONAL INFORMATION:\n`;
    emailBody += `Full Name: ${data.fullName}\n`;
    emailBody += `Date of Birth: ${formatDate(data.dateOfBirth)}\n`;
    emailBody += `Gender: ${data.gender}\n`;
    emailBody += `Phone Number: ${data.phoneNumber}\n`;
    emailBody += `Email Address: ${data.emailAddress}\n\n`;
    
    emailBody += `APPOINTMENT DETAILS:\n`;
    emailBody += `Service: ${data.service}\n`;
    emailBody += `Preferred Date: ${formatDate(data.preferredDate)}\n`;
    emailBody += `Preferred Time: ${data.preferredTime}\n`;
    emailBody += `Preferred Doctor: ${data.preferredDoctor || 'No preference'}\n\n`;
    
    emailBody += `PATIENT INFORMATION:\n`;
    emailBody += `Appointment for self: ${data.isForSelf ? 'Yes' : 'No'}\n`;
    if (!data.isForSelf) {
      emailBody += `Patient Name: ${data.patientName}\n`;
      emailBody += `Patient Age: ${data.patientAge}\n`;
      emailBody += `Relationship to Patient: ${data.relationshipToPatient}\n`;
    }
    emailBody += `\n`;
    
    emailBody += `ADDITIONAL INFORMATION:\n`;
    emailBody += `Reason for Visit: ${data.reasonForVisit || 'Not specified'}\n`;
    emailBody += `Has Referral: ${data.hasReferral ? 'Yes' : 'No'}\n`;
    if (data.hasReferral && data.referralDocument) {
      emailBody += `Referral Document: ${data.referralDocument.name}\n`;
    }
    
    return emailBody;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.dateOfBirth || !formData.phoneNumber || 
        !formData.emailAddress || !formData.service || !formData.preferredDate || 
        !formData.preferredTime || !formData.agreeToTerms) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields and accept the terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    // If appointment is not for self, validate patient information
    if (!formData.isForSelf && (!formData.patientName || !formData.patientAge || !formData.relationshipToPatient)) {
      toast({
        title: "Patient Information Required",
        description: "Please provide complete patient information when booking for someone else.",
        variant: "destructive"
      });
      return;
    }

    console.log("Form submitted with data:", formData);
    
    // Create email with form data
    const emailSubject = `Appointment Booking Request - ${formData.fullName}`;
    const emailBody = formatEmailBody(formData);
    const emailTo = 'appointments@premierfamilyclinics.co.ke';
    
    // Create mailto link
    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast({
      title: "Email Client Opened",
      description: "Your default email client has been opened with the appointment details. Please send the email to complete your booking request.",
    });
  };

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-semibold text-center">
          Appointment Booking Form
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <PersonalInformation formData={formData} updateFormData={updateFormData} />
          <AppointmentDetails formData={formData} updateFormData={updateFormData} />
          <PatientInformation formData={formData} updateFormData={updateFormData} />
          <AdditionalNotes formData={formData} updateFormData={updateFormData} />
          <ConsentSection formData={formData} updateFormData={updateFormData} />
          
          <div className="pt-6 border-t">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Submit Appointment Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
