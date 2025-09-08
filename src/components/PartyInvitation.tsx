import { motion, useScroll, useTransform, useInView } from "framer-motion";
// Updated: Project synced to GitHub $(date)
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Users, Star, Sparkles, Utensils, Music, CreditCard, Mail, Copy } from "lucide-react";

// Updated: Project synced to GitHub $(date)

interface FormData {
  name: string;
  email: string;
  phone: string;
  hasAllergies: boolean;
  allergyComment: string;
  isELogIT: boolean;
  isNegotia: boolean;
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGA-vJEEv0BNMpW3k5pr5SGEPmkt92l8c3lROiuwqG-HUOTCEvMmGh3dcMuEOf_Jn_lg/exec";

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
    phone: "",
    hasAllergies: false,
    allergyComment: "",
    isELogIT: false,
    isNegotia: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Mangler informasjon",
        description: "Vennligst fyll ut alle påkrevde felt før du sender inn.",
        variant: "destructive"
      });
      return;
    }

    // Validate Transcom email
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
          phone: formData.phone,
          hasAllergies: formData.hasAllergies,
          allergyComment: formData.allergyComment,
          isELogIT: formData.isELogIT,
          isNegotia: formData.isNegotia
        }),
      });
      
      // With no-cors mode, we can't read the response, so we assume success
      // if no error is thrown during the fetch
      console.log('RSVP data sent successfully');
      
      toast({
        title: "🎉 WOW! Du er meldt på! 🎉",
        description: `Tusen takk ${formData.name}! Vi gleder oss til å se deg på Transcom Awards 2025! 🎄✨`,
        className: "toast-success-large",
        duration: 8000,
      });
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        hasAllergies: false, 
        allergyComment: "",
        isELogIT: false, 
        isNegotia: false 
      });
      
    } catch (error) {
      console.error('Feil:', error);
      toast({
        title: "Påmelding feilet",
        description: "Kunne ikke sende påmeldingen. Vennligst prøv igjen.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      
      {/* Event Details Section */}
      <EventDetails />
      
      {/* Image Gallery Section */}
      <ImageGallery />
      
      {/* RSVP Form */}
      <RSVPForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formSectionRef={formSectionRef} // Pass ref to RSVPForm
        isSubmitting={isSubmitting}
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

// Image Gallery Component
const ImageGallery = () => {
  // Fast liste med 6 bilder - 3 opp og 3 nede
  const images = [
    '/images/unnamed.jpg',
    '/images/unnamed (1).jpg',
    '/images/unnamed (3).jpg',
    '/images/unnamed (4).jpg',
    '/images/unnamed (5).jpg',
    '/images/unnamed (6).jpg'
  ];

  return (
    <motion.section 
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-party-blue to-party-blue-light mb-6">
            Minner fra i fjor 🎉
          </h2>
          <p className="text-xl text-muted-foreground">
            Se bilder fra våre tidligere feiringer!
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-party-blue/20 to-party-blue-light/20 border border-party-blue/30">
                <img
                  src={image}
                  alt={`Julebord 2024 bilde ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback hvis bildet ikke finnes
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            Gleder dere til å lage nye minner i år? 🎊
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Event Details Component
const EventDetails = () => {
  const { toast } = useToast();

  const handleVippsClick = () => {
    // Enkel løsning: åpne Vipps-appen
    window.location.href = 'vipps://';
  };

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText('90954328');
      console.log('Vipps nummer kopiert: 90954328');
    } catch (err) {
      console.error('Kunne ikke kopiere nummer:', err);
    }
  };
  return (
    <motion.section 
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-party-blue to-party-blue-light mb-6">
            Eventdetaljer
          </h2>
          <p className="text-xl text-muted-foreground">
            Alt du trenger å vite om Transcom Julebord 2025
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Venue & Food */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-party-blue/20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-party-blue mr-4" />
              <h3 className="text-2xl font-bold text-foreground">Sted & Mat</h3>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start">
                <Utensils className="w-5 h-5 text-party-blue mr-3 mt-1 flex-shrink-0" />
                <div>
                  <span><strong className="text-foreground">City Scene</strong> - Vi møtes på City scene</span>
                  <br />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-party-blue/10 border-party-blue/30 text-party-blue hover:bg-party-blue/20"
                    onClick={() => window.open('https://maps.google.com/?q=City+Scene+Fredrikstad', '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Åpne i Google Maps
                  </Button>
                </div>
              </div>
              <p className="flex items-start">
                <Utensils className="w-5 h-5 text-party-blue mr-3 mt-1 flex-shrink-0" />
                <span>3-retters middag servert til alle</span>
              </p>
              <p className="flex items-start">
                <Utensils className="w-5 h-5 text-party-blue mr-3 mt-1 flex-shrink-0" />
                <span>2 drikkebonger per person</span>
              </p>
              <p className="flex items-start">
                <Users className="w-5 h-5 text-party-blue mr-3 mt-1 flex-shrink-0" />
                <span>Bordplassering per team - alle sitter teamvis</span>
              </p>
            </div>
          </motion.div>

          {/* Entertainment */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-party-blue/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <Music className="w-8 h-8 text-party-blue mr-4" />
              <h3 className="text-2xl font-bold text-foreground">Underholdning</h3>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-start">
                <Star className="w-5 h-5 text-party-blue mr-3 mt-1 flex-shrink-0" />
                <span><strong className="text-foreground">Forrykende show</strong> under middagen</span>
              </p>
              <p className="flex items-start">
                <Music className="w-5 h-5 text-party-blue mr-3 mt-1 flex-shrink-0" />
                <span>DJ resten av kvelden etter showet</span>
              </p>
              <p className="flex items-start">
                <Sparkles className="w-5 h-5 text-party-blue mr-3 mt-1 flex-shrink-0" />
                <span>Festlig atmosfære hele kvelden</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Payment & Registration */}
        <motion.div
          className="bg-gradient-to-r from-party-blue/10 to-party-blue-light/10 backdrop-blur-sm rounded-2xl p-8 border border-party-blue/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Påmelding & Betaling</h3>
            <p className="text-lg text-muted-foreground">Viktig informasjon om påmelding og betaling</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <CreditCard className="w-6 h-6 text-party-blue mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Kostnad</h4>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">200 kr per person</strong><br />
                    <span className="text-sm">Bindende påmelding - hvis du ikke møter opp blir du trukket 1200 kr i lønn</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="w-6 h-6 text-party-blue mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Frist</h4>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">17. oktober</strong><br />
                    Påmeldings- og betalingsfrist
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-party-blue mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-foreground mb-2">Betaling til</h4>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Aina Koteng</strong><br />
                    <span className="text-sm">Kontant, kort eller Vipps</span>
                  </p>
                </div>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-party-blue/20">
                <h4 className="text-lg font-semibold text-foreground mb-3">Vipps</h4>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-orange-500 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 font-semibold"
                      onClick={handleVippsClick}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Åpne Vipps
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-1/4 bg-gray-500 border-gray-500 text-white hover:bg-gray-600 hover:border-gray-600 font-semibold"
                      onClick={handleCopyNumber}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-party-blue/10 border-party-blue/30 text-party-blue hover:bg-party-blue/20"
                    onClick={() => window.open('mailto:aina.koteng@transcom.com?subject=Transcom Awards - Betaling', '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send e-post til Aina
                  </Button>
                  
                  <p className="text-muted-foreground text-sm">
                    Send e-post til <strong>aina.koteng@transcom.com</strong> dersom du vippser
                  </p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Voting Section */}
        <motion.div
          className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/30 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Årets Helter</h3>
            <p className="text-lg text-muted-foreground">Stem på dine favoritter for årets Transcom Awards!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              className="h-16 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/50 text-foreground hover:from-amber-500/30 hover:to-yellow-500/30 hover:border-amber-500/70 font-semibold text-lg"
              onClick={() => {
                // TODO: Replace with actual voting link
                console.log('Stem på Årets Gledespreder');
              }}
            >
              <Star className="w-6 h-6 mr-3" />
              Stem på Årets Gledespreder
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-16 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/50 text-foreground hover:from-blue-500/30 hover:to-indigo-500/30 hover:border-blue-500/70 font-semibold text-lg"
              onClick={() => {
                // TODO: Replace with actual voting link
                console.log('Stem på Årets Transcom');
              }}
            >
              <Users className="w-6 h-6 mr-3" />
              Stem på Årets Transcomer
            </Button>
          </div>

        </motion.div>
      </div>
    </motion.section>
  );
};

// Update RSVPForm to accept formSectionRef and attach it to the section
const RSVPForm = ({ 
  formData, 
  handleInputChange, 
  handleSubmit,
  formSectionRef,
  isSubmitting
}: {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  formSectionRef: React.RefObject<HTMLElement>;
  isSubmitting: boolean;
}) => {
  const formRef = useRef<HTMLElement>(null);
  const isInView = useInView(formRef, { once: true });

  return (
    <section ref={el => {
      if (formRef && el) (formRef as any).current = el as HTMLElement;
      if (formSectionRef && el) (formSectionRef as any).current = el as HTMLElement;
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
                  placeholder="Navn"
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
                  placeholder="ditt.navn@transcom.com"
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
                  placeholder="+47 123 45 678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-party-blue/30 focus:border-party-blue rounded-xl h-12 text-foreground placeholder:text-muted-foreground"
                />
              </motion.div>
            </div>

            {/* Checkbox section */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-party-blue mb-4">Tilleggsinformasjon</h3>
              
              <div className="space-y-3">
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <div className="flex items-center space-x-3 p-3 bg-background/30 rounded-lg border border-party-blue/20">
                    <input
                      type="checkbox"
                      id="hasAllergies"
                      name="hasAllergies"
                      checked={formData.hasAllergies}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-party-blue bg-background border-party-blue/30 rounded focus:ring-party-blue focus:ring-2"
                    />
                    <label htmlFor="hasAllergies" className="text-sm font-medium text-foreground cursor-pointer">
                      Jeg har matallergier som arrangørene bør vite om
                    </label>
                  </div>
                  
                  {formData.hasAllergies && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-7"
                    >
                      <label htmlFor="allergyComment" className="block text-sm font-medium text-party-blue mb-2">
                        Beskriv allergiene dine (valgfritt)
                      </label>
                      <textarea
                        id="allergyComment"
                        name="allergyComment"
                        value={formData.allergyComment}
                        onChange={handleInputChange}
                        placeholder="F.eks. nøtter, gluten, laktose..."
                        rows={3}
                        className="w-full p-3 bg-background/50 border border-party-blue/30 focus:border-party-blue rounded-xl text-foreground placeholder:text-muted-foreground resize-none"
                      />
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 p-3 bg-background/30 rounded-lg border border-party-blue/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="checkbox"
                    id="isELogIT"
                    name="isELogIT"
                    checked={formData.isELogIT}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-party-blue bg-background border-party-blue/30 rounded focus:ring-party-blue focus:ring-2"
                  />
                  <label htmlFor="isELogIT" className="text-sm font-medium text-foreground cursor-pointer">
                    Jeg er medlem av ELogIT
                  </label>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 p-3 bg-background/30 rounded-lg border border-party-blue/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="checkbox"
                    id="isNegotia"
                    name="isNegotia"
                    checked={formData.isNegotia}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-party-blue bg-background border-party-blue/30 rounded focus:ring-party-blue focus:ring-2"
                  />
                  <label htmlFor="isNegotia" className="text-sm font-medium text-foreground cursor-pointer">
                    Jeg er medlem av Negotia
                  </label>
                </motion.div>
              </div>
            </motion.div>

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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sender inn...
                  </>
                ) : (
                  <>
                    <Users className="w-6 h-6 mr-3" />
                    Send inn!
                  </>
                )}
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
        <p className="text-lg text-muted-foreground mb-6">
          Vi gleder oss til å se deg der! 🎉
        </p>
        
        <div className="mt-8 pt-6 border-t border-party-blue/20">
          <p className="text-muted-foreground italic">
            Med vennlig hilsen<br />
            <strong className="text-foreground text-lg">Festkomiteen</strong>
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <Sparkles className="w-6 h-6 text-party-blue animate-party-bounce" />
          <Star className="w-6 h-6 text-party-blue animate-float" />
          <Sparkles className="w-6 h-6 text-party-blue animate-party-bounce" />
        </div>
      </motion.div>
    </footer>
  );
};

export default PartyInvitation;