import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Smartphone,
  Activity,
  Zap,
  Sparkles,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const WaveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-50">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#ec4899', stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0}} />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.2}} />
              <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0}} />
            </linearGradient>
          </defs>
          <g transform="translate(0, 0)">
            <path
              fill="url(#wave-gradient-1)"
              d="M -500 500 Q 250 200 1000 500 T 2500 500"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="-200,0; 200,0; -200,0"
                dur="40s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          <g transform="translate(0, 0)">
            <path
              fill="url(#wave-gradient-2)"
              d="M -500 700 Q 500 900 1250 700 T 3000 700"
            >
               <animateTransform
                attributeName="transform"
                type="translate"
                values="300,0; -300,0; 300,0"
                dur="50s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>
  );
};

const navigationItems = [
  {
    title: "Status",
    url: "/status",
    icon: Activity,
    color: "text-pink-500"
  },
  {
    title: "Processos",
    url: "/processos",
    icon: Smartphone,
    color: "text-blue-500"
  },
  {
    title: "Otimizar",
    url: "/otimizacao",
    icon: Zap,
    color: "text-purple-500"
  },
  {
    title: "Limpeza",
    url: "/limpeza",
    icon: Sparkles,
    color: "text-pink-400"
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
    color: "text-blue-400"
  }
];

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState({ email: "usuario@exemplo.com" }); // Mock user
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // Simular logout
    console.log("Logout realizado");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Carregando PulseX...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-200">
      <WaveBackground />
      
      <div className="relative">
        <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    PulseX
                  </h1>
                  <p className="text-xs text-gray-500">Performance em Pulso</p>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <nav className="hidden lg:flex items-center gap-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <Link
                      key={item.title}
                      to={item.url}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        isActive
                          ? "bg-white/10"
                          : "hover:bg-white/5 text-gray-400"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? item.color : ""}`} />
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </nav>
            </div>

            {mobileMenuOpen && (
              <nav className="lg:hidden mt-4 pb-4 space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <Link
                      key={item.title}
                      to={item.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-white/10"
                          : "hover:bg-white/5 text-gray-400"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? item.color : ""}`} />
                      <span className="font-medium">
                        {item.title}
                      </span>
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </button>
              </nav>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}