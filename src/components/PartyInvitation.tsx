import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Users, Star, Sparkles, Utensils, Music, CreditCard, Mail } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  hasAllergies: boolean;
  allergyComment: string;
  isELogIT: boolean;
  isNegotia: boolean;
  teamLeader: string;
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzsYhPYOC94hFoQyh4vuT1tRh4cQDO2TJLQbycoERiN-EDgSmmd85iumnBxsiwU-bqZMA/exec";

const PartyInvitation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    hasAllergies: false,
    allergyComment: "",
    isELogIT: false,
    isNegotia: false,
    teamLeader: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Mangler informasjon",
        description: "Vennligst fyll ut alle påkrevde felt før du sender inn.",
        variant: "destructive"
      });
      return;
    }
    if (!formData.email.toLowerCase().includes('@transcom.com')) {
      toast({
        title: "Ugyldig e-post",
        description: "Vennligst bruk din Transcom e-postadresse (@transcom.com).",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          hasAllergies: formData.hasAllergies,
          allergyComment: formData.allergyComment,
          isELogIT: formData.isELogIT,
          isNegotia: formData.isNegotia,
          teamleder: formData.teamLeader
        }),
      });
      toast({
        title: "🎉 WOW! Du er meldt på! 🎉",
        description: `Tusen takk ${formData.name}! Vi gleder oss til å se deg på Transcom Awards 2025! 🎄✨`,
        className: "toast-success-large",
        duration: 5000,
      });
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        hasAllergies: false, 
        allergyComment: "",
        isELogIT: false, 
        isNegotia: false,
        teamLeader: ""
      });
    } catch (error) {
      toast({
        title: "Påmelding feilet",
        description: "Kunne ikke sende påmeldingen. Vennligst prøv igjen.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-glow opacity-50"
        style={{ y: backgroundY }}
      />
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-party-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      {/* Hero Section */}
      {/* ...existing code for HeroSection, PartyDetails, EventDetails, ImageGallery, RSVPForm, Footer... */}
    </div>
  );
};

export default PartyInvitation;
