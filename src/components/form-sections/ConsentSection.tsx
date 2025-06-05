
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from "@/types/appointment";

interface ConsentSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const ConsentSection = ({ formData, updateFormData }: ConsentSectionProps) => {
  return (
    <Card className="border-2 border-red-100">
      <CardHeader className="bg-red-50">
        <CardTitle className="text-xl text-red-800">5. Consent & Submission</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => updateFormData({ agreeToTerms: checked as boolean })}
            className="mt-1 border-gray-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
          />
          <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
            <span className="font-semibold">Terms & Conditions</span> <span className="text-red-500">*</span>
            <br />
            I confirm that the information provided is accurate and consent to the clinic contacting me regarding this appointment. 
            I understand that this form is for appointment requests and does not guarantee a confirmed appointment until contacted by the clinic staff.
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsentSection;
