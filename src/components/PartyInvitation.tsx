import { motion, useScroll, useTransform, useInView } from "framer-motion";
// Updated: Project synced to GitHub $(date)
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Star, Sparkles, Utensils, Music, Wine, Fish, Beef, IceCream } from "lucide-react";
import InstallPWA from "@/components/InstallPWA";
import NavigationMenu from "@/components/NavigationMenu";

// Updated: Project synced to GitHub $(date)

/**
 * Grensesnitt for å representere en enkelt rett på menyen.
 */
interface MenuItem {
    course: 'Forrett' | 'Hovedrett' | 'Dessert'; // Type for retten (starter, main, dessert)
    title: string;                               // Den lange beskrivelsen av retten
    allergens: string[];                         // Liste over allergenkoder (Inneholder:)
    wineRecommendation: string;                  // Anbefalt vin (Vinanbefaling:)
}

/**
 * Metadata for menyen.
 */
const menuMetadata = {
    menuName: "MENY",
    restaurant: "Scandic"
};

/**
 * Meny 1, strukturert i TypeScript.
 */
const menu1: MenuItem[] = [
    {
        course: 'Forrett',
        title: "Chilistekte argentinske villreker med guacamole, salat med koriander, ananas, chipotlemayones og skivet reddik",
        allergens: ["S", "E", "Sn", "M"],
        wineRecommendation: "Dr. Loosen Red Slate Riesling eller Les Pierres Dorées Sauvignon Blanc Organic"
    },
    {
        course: 'Hovedrett',
        title: "Helstekt indrefilet av norsk storfe med bakt sellerikrem, lun brokkolinisalat med syltet rødløk og ristede nøtter. Stekte småpoteter og rødvinssaus",
        allergens: ["Sl", "M", "N (hasselnøtt)", "Su"],
        wineRecommendation: "Arc Du Rhone Rouge eller Fontanafredda Ebbio Langhe Nebbiolo"
    },
    {
        course: 'Dessert',
        title: "Pasjonsfruktmousse på kokosbunn med pasjonsfruktgelé og kokossorbet",
        allergens: ["M", "E"],
        wineRecommendation: "Royal Tokaji Late Harvest"
    }
];


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
        className="fixed inset-0 bg-gradient-glow opacity: 0y-50"
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
      
      {/* Menu Section */}
      <MenuSection />
      
      {/* Nominees Section */}
      <NomineesSection />
      
      {/* Image Gallery Section */}
      <ImageGallery />
      
      {/* Footer */}
      <Footer />
      
      {/* Navigation Menu */}
      <NavigationMenu />
      
      {/* PWA Install Button */}
      <InstallPWA />
    </div>
  );
};


// Menu Section Component
const MenuSection = () => {
  const menuRef = useRef(null);
  const isInView = useInView(menuRef, { once: true });

  const getCourseIcon = (course: string) => {
    switch (course) {
      case 'Forrett':
        return Fish;
      case 'Hovedrett':
        return Beef;
      case 'Dessert':
        return IceCream;
      default:
        return Utensils;
    }
  };

  return (
    <motion.section 
      id="menu"
      ref={menuRef}
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-party-blue to-party-blue-light mb-6">
            Meny 🍽️
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            {menuMetadata.menuName} - {menuMetadata.restaurant}
          </p>
          <p className="text-lg text-muted-foreground">
            3-retters middag med vinanbefaling
          </p>
        </motion.div>

        <div className="space-y-8">
          {menu1.map((item, index) => {
            const CourseIcon = getCourseIcon(item.course);
            
            return (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-party-blue/20 hover:shadow-card transition-all duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-party-blue to-party-blue-light rounded-xl flex items-center justify-center">
                    <CourseIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-party-blue mb-3">
                      {item.course}
                    </h3>
                    <p className="text-foreground text-lg leading-relaxed mb-4">
                      {item.title}
                    </p>
                  </div>
                </div>

                <div className="pl-16 space-y-3">
                  {/* Allergener */}
                  <div className="flex items-start gap-3">
                    <span className="text-muted-foreground font-medium min-w-[110px]">
                      Inneholder:
                    </span>
                    <span className="text-foreground">
                      {item.allergens.join(', ')}
                    </span>
                  </div>

                  {/* Vinanbefaling */}
                  <div className="flex items-start gap-3">
                    <Wine className="w-5 h-5 text-party-blue mt-0.5 flex-shrink-0" />
                    <div className="flex-grow">
                      <span className="text-muted-foreground font-medium">
                        Vinanbefaling:{' '}
                      </span>
                      <span className="text-foreground">
                        {item.wineRecommendation}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-party-blue/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-center">
            <strong className="text-foreground">Allergenkoder:</strong> S = Skalldyr, E = Egg, Sn = Sennep, M = Melk, Sl = Selleri, N = Nøtter, Su = Sulfitt
          </p>
        </motion.div>
      </div>
    </motion.section>
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
      id="gallery"
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
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
              transition={{ duration: 0.2, delay: index * 0.05 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity: 0y-0 group-hover:opacity: 0y-100 transition-opacity: 0y duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            Gjør dere klare til å lage nye minner i år! 🎊
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Nominees Section Component
const NomineesSection = () => {
  const nomineesRef = useRef(null);
  const isInView = useInView(nomineesRef, { once: true });

  const awardCategories = [
    {
      title: "Årets Nykommer",
      nominees: ["Omid Mahmudiyan", "Amanda Pedersen", "Artor Domi"]
    },
    {
      title: "Årets Homeworker", 
      nominees: ["Heidi Murtnes", "Ellen Gunneng", "Lars Hermansen"]
    },
    {
      title: "Årets Gledesspreder",
      nominees: ["Espen Nipe", "Sarmad Hussein", "Markus Kristiansen"]
    },
    {
      title: "Årets Kvalitet",
      nominees: ["Levi Alexander Dischler Sporsheim", "Wilhelm Justin Godtfeld", "Julie Hansen Edvardsen"]
    },
    {
      title: "Årets Selger",
      nominees: ["Jasmin Mohammed", "Mahamed Sheekh Doon", "Måns Nystrøm"]
    },
    {
      title: "Årets Team",
      nominees: ["Antichurn", "Hunter 3", "Bedrift Retention"]
    },
    {
      title: "Årets Hederspris",
      nominees: ["Avsløres under festen"]
    },
    {
      title: "Årets Transcom'er",
      nominees: ["Avsløres under festen"]
    }
  ];

  return (
    <motion.section 
      id="nominees"
      ref={nomineesRef}
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-party-blue to-party-blue-light mb-6">
            Årets Nominerte 🏆
          </h2>
          <p className="text-xl text-muted-foreground">
            Gratulerer til alle nominerte i alle priser! Vinnerne avsløres under festen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awardCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-party-blue/20 hover:shadow-card transition-all duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: categoryIndex * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-party-blue mb-6">
                  {category.title}
                </h3>
                
                <div className="space-y-3">
                  {category.nominees.map((nominee, nomineeIndex) => (
                    <motion.div
                      key={nominee}
                      className="bg-background/30 rounded-lg p-4 border border-party-blue/10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: (categoryIndex * 0.05) + (nomineeIndex * 0.03), duration: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-center">
                        <Star className="w-5 h-5 text-party-blue mr-3 flex-shrink-0" />
                        <span className="text-foreground font-medium text-lg">
                          {nominee}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};

// Event Details Component
const EventDetails = () => {
  return (
    <motion.section 
      id="event-details"
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
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
      info: "1830 - festen varer til du er på do og spyr men kan være der litt til og kjøpe kebab på nellys..."
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
    <section id="party-details" ref={detailsRef} className="py-20 px-6">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-party-blue via-purple-500 to-pink-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Transcom Awards 2025
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              className="bg-card/50 backdrop-blur-sm border border-party-blue/20 rounded-2xl p-8 text-center hover:shadow-card transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
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
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
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