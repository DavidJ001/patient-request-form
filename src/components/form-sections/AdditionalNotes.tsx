
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from "@/types/appointment";

interface AdditionalNotesProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const AdditionalNotes = ({ formData, updateFormData }: AdditionalNotesProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateFormData({ referralDocument: file });
  };

  return (
    <Card className="border-2 border-orange-100">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-xl text-orange-800">4. Additional Notes or Symptoms</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reasonForVisit" className="text-sm font-semibold text-gray-700">
            Reason for Visit / Symptoms
          </Label>
          <Textarea
            id="reasonForVisit"
            value={formData.reasonForVisit}
            onChange={(e) => updateFormData({ reasonForVisit: e.target.value })}
            placeholder="Please describe your symptoms or reason for the visit. This helps us prepare for your appointment."
            rows={4}
            className="border-gray-300 focus:border-orange-500 resize-none"
          />
          <p className="text-xs text-gray-500">Optional but encouraged - helps us provide better care</p>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">
            Do you have a referral?
          </Label>
          <RadioGroup 
            value={formData.hasReferral ? "yes" : "no"} 
            onValueChange={(value) => updateFormData({ hasReferral: value === "yes" })}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="referral-yes" />
              <Label htmlFor="referral-yes" className="cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="referral-no" />
              <Label htmlFor="referral-no" className="cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.hasReferral && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border space-y-3">
            <Label htmlFor="referralDocument" className="text-sm font-semibold text-gray-700">
              Upload Referral Document (Optional)
            </Label>
            <Input
              id="referralDocument"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="border-gray-300 focus:border-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            <p className="text-xs text-gray-500">
              Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 5MB)
            </p>
            {formData.referralDocument && (
              <p className="text-sm text-green-600 font-medium">
                ✓ File selected: {formData.referralDocument.name}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdditionalNotes;
