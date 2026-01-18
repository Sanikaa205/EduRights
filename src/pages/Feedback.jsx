import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle, Star } from "lucide-react";

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF8F0] relative overflow-hidden">
        {/* Decorative Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-green-200/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 -right-20 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-24 left-[10%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3s'}}>🎉</div>
          <div className="absolute top-40 right-[15%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>💙</div>
          <div className="absolute bottom-40 left-[8%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.5s', animationDelay: '1s'}}>⭐</div>
        </div>
        
        <Navbar />

        <main className="flex-1 flex items-center justify-center py-12 px-4 relative z-10">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-bold text-3xl text-gray-800 mb-3">
                Thank You! 🎉
              </h1>
              <p className="text-gray-500 text-lg mb-6">
                Your feedback helps us make EduRights even better for kids like you!
              </p>
              <div className="text-5xl mb-6">💙</div>
              <Button
                variant="hero"
                size="lg"
                className="gap-2"
                onClick={() => {
                  setSubmitted(false);
                  setFeedback("");
                  setName("");
                  setRating(0);
                }}
              >
                Send More Feedback
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] relative overflow-hidden">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Floating emojis */}
        <div className="absolute top-24 left-[10%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3s'}}>💬</div>
        <div className="absolute top-40 right-[15%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>💙</div>
        <div className="absolute bottom-40 left-[8%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.5s', animationDelay: '1s'}}>⭐</div>
        <div className="absolute top-60 right-[10%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.8s', animationDelay: '1.5s'}}>✨</div>
        <div className="absolute bottom-60 right-[22%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.2s', animationDelay: '2s'}}>🌟</div>
        <div className="absolute top-1/2 left-[5%] text-3xl animate-pulse opacity-30" style={{animationDuration: '2s'}}>💖</div>
      </div>
      
      <Navbar />

      <main className="flex-1 py-8 md:py-12 relative z-10">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4">
          <div className="mx-auto max-w-2xl bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-lg mb-6">
              <span className="text-4xl">💬</span>
            </div>
            <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-3">
              Share Your Thoughts!
            </h1>
            <p className="text-gray-500 text-lg">
              We love hearing from you! Your thoughts help us improve 💙
            </p>
          </div>

          {/* Feedback Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold text-gray-700">
                  Your Name (optional) 👋
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="What should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-500"
                />
              </div>

              {/* Star Rating */}
              <div className="space-y-2">
                <Label className="font-semibold text-gray-700">
                  How much do you like EduRights? ⭐
                </Label>
                <div className="flex items-center gap-2 justify-center py-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform duration-200 hover:scale-125"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoveredRating || rating)
                            ? "text-secondary fill-secondary"
                            : "text-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center font-body text-muted-foreground text-sm">
                    {rating === 5 && "Amazing! You're awesome! 🌟"}
                    {rating === 4 && "Great! Thanks for the feedback! 😊"}
                    {rating === 3 && "Thanks! We'll work to make it better! 💪"}
                    {rating === 2 && "We appreciate your honesty! 🙏"}
                    {rating === 1 && "We're sorry! Tell us how to improve! 💙"}
                  </p>
                )}
              </div>

              {/* Feedback Text */}
              <div className="space-y-2">
                <Label htmlFor="feedback" className="font-body font-semibold text-foreground">
                  Tell us what you think! 💭
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="What do you like? What could be better? Any ideas?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-32 rounded-xl border-2 border-muted focus:border-primary font-body resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground font-body">
                  Your feedback is super helpful! We read every message. 📨
                </p>
              </div>

              {/* Emoji Reactions */}
              <div className="space-y-2">
                <Label className="font-body font-semibold text-foreground">
                  Pick an emoji that shows how you feel 😄
                </Label>
                <div className="flex flex-wrap justify-center gap-3">
                  {["😍", "😊", "🤔", "😐", "😕", "🥺"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="text-3xl p-2 hover:scale-125 transition-transform duration-200 hover:bg-muted rounded-xl"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full gap-2"
                disabled={!feedback.trim()}
              >
                <Send className="w-5 h-5" />
                Send Feedback
                <span className="text-lg">🚀</span>
              </Button>
            </form>
          </div>

          {/* Fun message */}
          <p className="text-center text-sm text-muted-foreground font-body mt-6">
            Your opinion matters to us! Together we can make learning even more fun! 🌈
          </p>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;
