import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eye, EyeOff, UserPlus, Sparkles, Star } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

 const handleSubmit = (e) => {
  e.preventDefault();

  // Save user data
  localStorage.setItem(
    "user",
    JSON.stringify({
      name: formData.name,
      email: formData.email,
      age: formData.age,
    })
  );

  // Redirect to dashboard
  window.location.href = "/dashboard";
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-hero rounded-3xl shadow-button mb-6">
              <span className="text-4xl">🌟</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Join the Adventure!
            </h1>
            <p className="font-body text-muted-foreground">
              Create your account and start learning ✨
            </p>
          </div>

          {/* Form Card */}
          <div className="card-playful">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-body font-semibold text-foreground">
                  What's your name? 👋
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your awesome name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-2 border-muted focus:border-primary font-body"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="font-body font-semibold text-foreground">
                  How old are you? 🎂
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="8"
                  max="16"
                  placeholder="Your age (8-16)"
                  value={formData.age}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-2 border-muted focus:border-primary font-body"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-body font-semibold text-foreground">
                  Email Address 📧
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-2 border-muted focus:border-primary font-body"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-body font-semibold text-foreground">
                  Create a Password 🔒
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Make it strong!"
                    value={formData.password}
                    onChange={handleChange}
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
                <p className="text-xs text-muted-foreground font-body">
                  Ask a parent to help you choose a safe password!
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
                <UserPlus className="w-5 h-5" />
                Start My Journey!
                <Star className="w-5 h-5" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground font-body">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full">
                Login Instead 👋
              </Button>
            </Link>
          </div>

          {/* Fun message */}
          <p className="text-center text-sm text-muted-foreground font-body mt-6">
            By joining, you agree to learn and have fun! 💙
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
