
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

interface AppointmentDetailsProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const AppointmentDetails = ({ formData, updateFormData }: AppointmentDetailsProps) => {
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  return (
    <Card className="border-2 border-green-100">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-xl text-green-800">2. Appointment Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            Select Service <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.service} onValueChange={(value) => updateFormData({ service: value })}>
            <SelectTrigger className="border-gray-300 focus:border-green-500">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="obstetrics-gynecology">Obstetrics & Gynecology</SelectItem>
              <SelectItem value="paediatric-clinic">Paediatric Clinic Services</SelectItem>
              <SelectItem value="antenatal-clinic">Antenatal Clinic</SelectItem>
              <SelectItem value="adolescent-gynecology">Adolescent Gynecology</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Preferred Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-300 focus:border-green-500",
                    !formData.preferredDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Select appointment date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.preferredDate}
                  onSelect={(date) => updateFormData({ preferredDate: date })}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Preferred Time <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.preferredTime} onValueChange={(value) => updateFormData({ preferredTime: value })}>
              <SelectTrigger className="border-gray-300 focus:border-green-500">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-60">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredDoctor" className="text-sm font-semibold text-gray-700">
            Preferred Doctor (Optional)
          </Label>
          <Input
            id="preferredDoctor"
            value={formData.preferredDoctor}
            onChange={(e) => updateFormData({ preferredDoctor: e.target.value })}
            placeholder="Enter doctor's name (if any preference)"
            className="border-gray-300 focus:border-green-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentDetails;
