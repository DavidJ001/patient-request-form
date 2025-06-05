
import AppointmentForm from "@/components/AppointmentForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Schedule your appointment with our experienced medical professionals. 
              Please fill out the form below with accurate information.
            </p>
          </div>
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
