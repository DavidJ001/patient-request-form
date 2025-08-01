import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PersonalInformation from "./form-sections/PersonalInformation";
import AppointmentDetails from "./form-sections/AppointmentDetails";
import PatientInformation from "./form-sections/PatientInformation";
import AdditionalNotes from "./form-sections/AdditionalNotes";
import ConsentSection from "./form-sections/ConsentSection";
import ClinicMenu from "./ClinicMenu";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    try {
      console.log("Submitting form with data:", formData);
      
      // Call the Supabase Edge Function to send email
      const { data, error } = await supabase.functions.invoke('send-appointment-email', {
        body: { formData }
      });

      if (error) {
        console.error("Error from edge function:", error);
        throw error;
      }

      console.log("Response from edge function:", data);
      
      toast({
        title: "Appointment Request Submitted!",
        description: "Your appointment request has been received by Premier Family Clinics. We will contact you soon to confirm your appointment.",
      });

      // Reset form after successful submission
      setFormData({
        fullName: "",
        dateOfBirth: undefined,
        gender: "",
        phoneNumber: "",
        emailAddress: "",
        service: "",
        preferredDate: undefined,
        preferredTime: "",
        preferredDoctor: "",
        isForSelf: true,
        patientName: "",
        patientAge: "",
        relationshipToPatient: "",
        reasonForVisit: "",
        hasReferral: false,
        referralDocument: null,
        agreeToTerms: false
      });

    } catch (error: any) {
      console.error("Error submitting appointment:", error);
      toast({
        title: "Error Submitting Request",
        description: "There was an error submitting your appointment request. Please try again or contact us directly at appointments@premierfamilyclinics.co.ke",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
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
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? "Sending Request..." : "Submit Appointment Request"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <ClinicMenu />
    </div>
  );
};

export default AppointmentForm;