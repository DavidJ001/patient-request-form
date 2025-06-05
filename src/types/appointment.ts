
export interface FormData {
  // Personal Information
  fullName: string;
  dateOfBirth: Date | undefined;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
  
  // Appointment Details
  service: string;
  preferredDate: Date | undefined;
  preferredTime: string;
  preferredDoctor: string;
  
  // Patient Information
  isForSelf: boolean;
  patientName: string;
  patientAge: string;
  relationshipToPatient: string;
  
  // Additional Notes
  reasonForVisit: string;
  hasReferral: boolean;
  referralDocument: File | null;
  
  // Consent
  agreeToTerms: boolean;
}
