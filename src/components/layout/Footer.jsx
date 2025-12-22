import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-hero rounded-xl flex items-center justify-center">
              <span className="text-lg">📚</span>
            </div>
            <span className="font-display font-bold text-lg text-gradient">
              EduRights
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-body">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/modules" className="text-muted-foreground hover:text-primary transition-colors">
              Learning
            </Link>
            <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">
              Resources
            </Link>
            <Link to="/feedback" className="text-muted-foreground hover:text-primary transition-colors">
              Feedback
            </Link>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground font-body">
            Made with <Heart className="w-4 h-4 text-pink fill-pink" /> for kids everywhere
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground font-body">
          <p>© 2024 EduRights. Helping children learn their rights through play! 🌟</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
