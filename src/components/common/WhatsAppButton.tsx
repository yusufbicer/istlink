
import { MessageCircle } from "lucide-react";
import { useState } from "react";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "+905533684250";
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber.replace(/\+/g, "")}`, "_blank");
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="mr-2 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-md text-sm font-medium animate-fade-in">
          Chat with us on WhatsApp
        </div>
      )}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
