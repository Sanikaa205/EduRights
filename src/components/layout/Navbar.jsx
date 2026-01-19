import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Home,
  Trophy,
  HelpCircle,
  MessageSquare,
  LogIn,
  LogOut,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: Trophy },
    { path: "/modules", label: "Learn", icon: BookOpen },
    { path: "/games", label: "Games", icon: Sparkles },
    { path: "/resources", label: "Help", icon: HelpCircle },
    { path: "/feedback", label: "Feedback", icon: MessageSquare }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b-4 border-primary/20">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 md:w-11 md:h-11 gradient-hero rounded-xl flex items-center justify-center shadow-[0_3px_0_hsl(280_70%_45%)] group-hover:shadow-[0_1px_0_hsl(280_70%_45%)] group-hover:translate-y-[2px] transition-all">
              <span className="text-xl md:text-2xl">📚</span>
            </div>
            <span className="font-display font-bold text-xl md:text-2xl text-gradient">
              EduRights
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="default"
                  className="gap-2 px-4 text-base font-semibold"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <Button
                variant="outline"
                size="default"
                className="gap-2 px-5 text-base font-semibold"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-2 px-5 text-base font-semibold"
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="hero"
                    size="default"
                    className="gap-2 px-5 text-base font-semibold"
                  >
                    <Sparkles className="w-5 h-5" />
                    Join Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-2xl bg-muted hover:bg-muted/80 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-border animate-slide-up">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="w-full justify-start gap-3 py-3 text-lg font-semibold"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}

              <div className="flex gap-3 mt-4 pt-4 border-t-2 border-border">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full py-3 text-lg font-semibold gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full py-3 text-lg font-semibold"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="hero"
                        className="w-full py-3 text-lg font-semibold"
                      >
                        Join Free ✨
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
