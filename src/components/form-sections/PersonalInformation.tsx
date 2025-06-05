
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FormData } from "@/types/appointment";

interface PersonalInformationProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const PersonalInformation = ({ formData, updateFormData }: PersonalInformationProps) => {
  return (
    <Card className="border-2 border-blue-100">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl text-blue-800">1. Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              placeholder="Enter your full name"
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-300 focus:border-blue-500",
                    !formData.dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select date of birth"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={(date) => updateFormData({ dateOfBirth: date })}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Gender <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
              placeholder="(555) 123-4567"
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailAddress" className="text-sm font-semibold text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={(e) => updateFormData({ emailAddress: e.target.value })}
              placeholder="john@example.com"
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
