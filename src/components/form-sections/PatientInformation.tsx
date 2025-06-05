
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from "@/types/appointment";

interface PatientInformationProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const PatientInformation = ({ formData, updateFormData }: PatientInformationProps) => {
  return (
    <Card className="border-2 border-purple-100">
      <CardHeader className="bg-purple-50">
        <CardTitle className="text-xl text-purple-800">3. Patient Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">
            Is this appointment for you?
          </Label>
          <RadioGroup 
            value={formData.isForSelf ? "yes" : "no"} 
            onValueChange={(value) => updateFormData({ isForSelf: value === "yes" })}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        {!formData.isForSelf && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border space-y-4">
            <h4 className="font-semibold text-gray-700 mb-3">Patient Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName" className="text-sm font-semibold text-gray-700">
                  Patient's Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => updateFormData({ patientName: e.target.value })}
                  placeholder="Enter patient's full name"
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientAge" className="text-sm font-semibold text-gray-700">
                  Patient's Age <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="patientAge"
                  type="number"
                  value={formData.patientAge}
                  onChange={(e) => updateFormData({ patientAge: e.target.value })}
                  placeholder="Enter patient's age"
                  min="0"
                  max="150"
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationshipToPatient" className="text-sm font-semibold text-gray-700">
                Relationship to Patient <span className="text-red-500">*</span>
              </Label>
              <Input
                id="relationshipToPatient"
                value={formData.relationshipToPatient}
                onChange={(e) => updateFormData({ relationshipToPatient: e.target.value })}
                placeholder="e.g., Parent, Spouse, Guardian, etc."
                className="border-gray-300 focus:border-purple-500"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientInformation;
