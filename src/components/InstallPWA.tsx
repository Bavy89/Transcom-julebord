import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
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

  // Don't show button if already installed or not supported
  if (!supportsPWA || isInstalled) {
    return null;
  }

  return (
    <Button
      onClick={handleInstallClick}
      variant="party"
      size="lg"
      className="fixed bottom-6 right-6 z-50 shadow-2xl animate-glow-pulse"
    >
      <Download className="w-5 h-5 mr-2" />
      Last ned appen
    </Button>
  );
};

export default InstallPWA;