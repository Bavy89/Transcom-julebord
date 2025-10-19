import { motion, useScroll, useTransform, useInView } from "framer-motion";
// Updated: Project synced to GitHub $(date)
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Star, Sparkles, Utensils, Music } from "lucide-react";

// Updated: Project synced to GitHub $(date)


const PartyInvitation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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

      {/* Party Details */}
      <PartyDetails />
      
      {/* Event Details Section */}
      <EventDetails />
      
      {/* Image Gallery Section */}
      <ImageGallery />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};


// Image Gallery Component
const ImageGallery = () => {
  // Fast liste med 6 bilder - 3 opp og 3 nede
  const images = [
    '/images/A4 - 2.png',
    '/images/A4 - 3.png',
    '/images/A4 - 4.png',
    '/images/A4 - 5.png',
    '/images/A4 - 6.png',
    '/images/A4 - 7.png'
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
                  alt={`Awards 2024 bilde ${index + 1}`}
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
            Alt du trenger å vite om Transcom Awards 2025
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              className="h-14 sm:h-16 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/50 text-foreground hover:from-amber-500/30 hover:to-yellow-500/30 hover:border-amber-500/70 font-semibold text-sm sm:text-lg px-3 sm:px-6"
              onClick={() => {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSdn_qkWpI_jTnmLt_4hlw9br0-wqKp-cZ6OZ6Elm3xTQ2Sj7g/viewform', '_blank');
              }}
            >
              <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              <span className="hidden xs:inline">Stem på Årets Gledespreder</span>
              <span className="xs:hidden">Årets Gledespreder</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 sm:h-16 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/50 text-foreground hover:from-blue-500/30 hover:to-indigo-500/30 hover:border-blue-500/70 font-semibold text-sm sm:text-lg px-3 sm:px-6"
              onClick={() => {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSfWAdahUldVbovK0zYmFuembKcTh3PQ6g_cK8wCVxVhwoIhow/viewform?usp=sharing&ouid=109777289333045991690', '_blank');
              }}
            >
              <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              <span className="hidden xs:inline">Stem på Årets Transcomer</span>
              <span className="xs:hidden">Årets Transcomer</span>
            </Button>
          </div>

        </motion.div>
      </div>
    </motion.section>
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
      info: "18:30 - 23:00"
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
