import { motion, useScroll, useTransform, useInView } from "framer-motion";
// Updated: Project synced to GitHub $(date)
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Users, Star, Sparkles } from "lucide-react";

// Updated: Project synced to GitHub $(date)

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCcuKR9Z6Z0IxiHXEgOxJj2kfDJemYH74Inzs_Y_EQQKcBQiJi-gYJbQt3P5QI1dKrVA/exec";

const PartyInvitation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLElement>(null); // Add ref for form section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: ""
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Use no-cors mode to avoid CORS issues with Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }),
      });
      
      // With no-cors mode, we can't read the response, so we assume success
      // if no error is thrown during the fetch
      console.log('RSVP data sent successfully');
      
      toast({
        title: "Wow, takk for at du meldte deg på! 🎉",
        description: `Vi gleder oss til å se deg på festen, ${formData.name}!`,
      });
      setFormData({ name: "", email: "", phone: "" });
      
    } catch (error) {
      console.error('Feil:', error);
      toast({
        title: "RSVP Failed",
        description: "Could not send your RSVP. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Function to scroll smoothly to the form section
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
      <HeroSection titleScale={titleScale} onScrollToForm={scrollToForm} />
      
      {/* Party Details */}
      <PartyDetails />
      
      {/* RSVP Form */}
      <RSVPForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formSectionRef={formSectionRef} // Pass ref to RSVPForm
      />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Update HeroSection to accept onScrollToForm prop
const HeroSection = ({ titleScale, onScrollToForm }: { titleScale: any, onScrollToForm: () => void }) => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ scale: titleScale }}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <Sparkles className="w-16 h-16 mx-auto text-party-blue animate-party-bounce" />
        </motion.div>
        
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-text bg-clip-text text-transparent bg-size-200 animate-text-shimmer"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          DU ER INVITERT!
        </motion.h1>
        
        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          til årets kuleste fest!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <Button 
            variant="party" 
            size="lg" 
            className="animate-glow-pulse"
            onClick={onScrollToForm} // Add click handler
          >
            <Star className="w-5 h-5 mr-2" />
            Trykk her for å melde deg på!
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Update RSVPForm to accept formSectionRef and attach it to the section
const RSVPForm = ({ 
  formData, 
  handleInputChange, 
  handleSubmit,
  formSectionRef
}: {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  formSectionRef: React.RefObject<HTMLElement>;
}) => {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  return (
    <section ref={el => {
      formRef.current = el;
      if (formSectionRef) formSectionRef.current = el;
    }} className="py-20 px-6 relative">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-party-blue">
            Er du klar?
          </h2>
          <p className="text-xl text-muted-foreground">
            Gi oss beskjed om du kommer ved å fylle ut skjemaet under!
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-party/10 backdrop-blur-sm border border-party-blue/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4">
            <Sparkles className="w-8 h-8 text-party-blue animate-party-bounce" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Star className="w-6 h-6 text-party-blue animate-float" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-party-blue">Navn</label>
                <Input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-party-blue/30 focus:border-party-blue rounded-xl h-12 text-foreground placeholder:text-muted-foreground"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-party-blue">E-post</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-party-blue/30 focus:border-party-blue rounded-xl h-12 text-foreground placeholder:text-muted-foreground"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-party-blue">Telefonnummer</label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-party-blue/30 focus:border-party-blue rounded-xl h-12 text-foreground placeholder:text-muted-foreground"
                />
              </motion.div>
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <Button 
                type="submit" 
                variant="rsvp" 
                size="lg"
                className="px-12 py-4 text-lg animate-glow-pulse"
              >
                <Users className="w-6 h-6 mr-3" />
                Send inn!
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

const PartyDetails = () => {
  const detailsRef = useRef(null);
  const isInView = useInView(detailsRef, { once: true });

  const details = [
    {
      icon: Calendar,
      title: "Dato",
      info: "8 November, 2025"
    },
    {
      icon: Clock,
      title: "Tid",
      info: "18:00 - 23:00"
    },
    {
      icon: MapPin,
      title: "Lokasjon",
      info: "City Scene Fredrikstad"
    },
    {
      icon: Users,
      title: "Dress Code",
      info: "PENT"
    }
  ];

  return (
    <section ref={detailsRef} className="py-20 px-6">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-party-blue"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Informasjon
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              className="bg-card/50 backdrop-blur-sm border border-party-blue/20 rounded-2xl p-8 text-center hover:shadow-card transition-all duration-300"
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <detail.icon className="w-12 h-12 mx-auto mb-4 text-party-blue animate-float" />
              <h3 className="text-xl font-semibold mb-2 text-party-blue">{detail.title}</h3>
              <p className="text-muted-foreground">{detail.info}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  return (
    <footer ref={footerRef} className="py-16 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg text-muted-foreground mb-4">
          Vi gleder oss til å se deg der! 🎉
        </p>
        <div className="flex justify-center space-x-4">
          <Sparkles className="w-6 h-6 text-party-blue animate-party-bounce" />
          <Star className="w-6 h-6 text-party-blue animate-float" />
          <Sparkles className="w-6 h-6 text-party-blue animate-party-bounce" />
        </div>
      </motion.div>
    </footer>
  );
};

export default PartyInvitation;