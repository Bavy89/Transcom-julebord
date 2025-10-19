import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download, X } from 'lucide-react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('pwa-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!promptInstall) {
      return;
    }
    
    const result = await promptInstall.prompt();
    console.log('Install prompt result:', result);
    
    if (result.outcome === 'accepted') {
      setSupportsPWA(false);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  // Don't show button if already installed, not supported, or dismissed
  if (!supportsPWA || isInstalled || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Desktop button - bottom right */}
      <Button
        onClick={handleInstallClick}
        variant="party"
        size="lg"
        className="hidden md:flex fixed bottom-6 right-6 z-50 shadow-2xl animate-glow-pulse"
      >
        <Download className="w-5 h-5 mr-2" />
        Last ned appen
      </Button>

      {/* Mobile widget - sticky at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/95 via-black/90 to-transparent backdrop-blur-lg">
        <div className="max-w-md mx-auto bg-gradient-to-r from-party-blue to-party-blue-light rounded-2xl p-4 shadow-2xl border border-white/20 relative">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
            aria-label="Lukk"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 bg-white/20 rounded-xl p-3">
              <Download className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-white">
              <h3 className="font-bold text-lg mb-1">Transcom Awards 2025</h3>
              <p className="text-sm text-white/90">Installer appen for rask tilgang</p>
            </div>
          </div>
          
          <Button
            onClick={handleInstallClick}
            className="w-full mt-4 bg-white text-party-blue hover:bg-white/90 font-bold"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Last ned appen
          </Button>
        </div>
      </div>
    </>
  );
};

export default InstallPWA;