import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eye, EyeOff, LogIn, Sparkles } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo - just redirect
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-hero rounded-3xl shadow-button mb-6">
              <span className="text-4xl">👋</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Welcome Back!
            </h1>
            <p className="font-body text-muted-foreground">
              Let's continue your learning adventure ✨
            </p>
          </div>

          {/* Form Card */}
          <div className="card-playful">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body font-semibold text-foreground">
                  Email or Username
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-2 border-muted focus:border-primary font-body"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-body font-semibold text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-2 border-muted focus:border-primary font-body pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
                <LogIn className="w-5 h-5" />
                Let's Go!
                <Sparkles className="w-5 h-5" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground font-body">
                  New here?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link to="/register">
              <Button variant="outline" size="lg" className="w-full">
                Create an Account 🎉
              </Button>
            </Link>
          </div>

          {/* Fun message */}
          <p className="text-center text-sm text-muted-foreground font-body mt-6">
            Forgot your password? Ask a parent or teacher to help! 💙
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
