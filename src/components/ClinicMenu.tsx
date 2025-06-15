
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, MapPin, Clock, Mail } from "lucide-react";

const ClinicMenu = () => {
  const menuItems = [
    {
      title: "Our Services",
      description: "Comprehensive healthcare services for the whole family",
      link: "https://premierfamilyclinics.co.ke/services"
    },
    {
      title: "About Us",
      description: "Learn more about our clinic and medical team",
      link: "https://premierfamilyclinics.co.ke/about"
    },
    {
      title: "Contact Us",
      description: "Get in touch with our clinic",
      link: "https://premierfamilyclinics.co.ke/contact"
    },
    {
      title: "Health Resources",
      description: "Educational materials and health tips",
      link: "https://premierfamilyclinics.co.ke/resources"
    }
  ];

  return (
    <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Premier Family Clinics</h3>
          <p className="text-gray-600">Your trusted healthcare partner</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 text-left justify-start hover:bg-blue-50 hover:border-blue-300 transition-colors"
              onClick={() => window.open(item.link, '_blank')}
            >
              <div>
                <div className="font-semibold text-gray-800 mb-1">{item.title}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
              <ExternalLink className="ml-auto h-4 w-4 text-blue-600" />
            </Button>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              <span>Call us for appointments</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>appointments@premierfamilyclinics.co.ke</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Mon-Fri: 8AM-6PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>Professional healthcare services</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicMenu;
