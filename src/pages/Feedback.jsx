import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle, Star } from "lucide-react";
import emailjs from "@emailjs/browser";

const styles = `
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes spinGradient {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes heartBeat {
    0%, 100% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.3);
    }
    50% {
      transform: scale(1);
    }
  }

  @keyframes successConfetti {
    0% {
      opacity: 1;
      transform: translateY(0) rotateZ(0deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) rotateZ(360deg);
    }
  }

  .animate-slideInDown {
    animation: slideInDown 0.6s ease-out forwards;
  }

  .animate-slideInUp {
    animation: slideInUp 0.6s ease-out forwards;
  }

  .animate-scaleIn {
    animation: scaleIn 0.5s ease-out forwards;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-spinGradient {
    animation: spinGradient 8s linear infinite;
  }

  .animate-heartBeat {
    animation: heartBeat 1.5s ease-in-out infinite;
  }

  .animate-successConfetti {
    animation: successConfetti 2s ease-out forwards;
  }

  .feedback-form-input {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .feedback-form-input:focus {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(168, 85, 247, 0.15);
  }

  .emoji-button {
    transition: all 0.3s ease;
  }

  .emoji-button:hover {
    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
  }

  .star-button {
    transition: all 0.2s ease;
  }

  .star-button:hover {
    filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.5));
  }
`;

if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}


const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: name || "Anonymous",
      rating: rating,
      feedback: feedback,
    };

    emailjs
      .send(
        "service_123456",     // your SERVICE ID
        "template_kasax1m",    // your TEMPLATE ID
        templateParams,
        "2ZCqpXCBS5J13uyPL"     // your PUBLIC KEY
      )
      .then(
        () => {
          setSubmitted(true);
          setFeedback("");
          setName("");
          setRating(0);
        },
        (error) => {
          alert("Failed to send feedback 😢");
          console.error(error);
        }
      );
  };


  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F0EBFF] relative overflow-hidden">
        {/* Decorative Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Moving gradient orbs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 -right-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Celebratory floating emojis */}
          <div className="absolute top-24 left-[10%] text-5xl animate-bounce" style={{ animationDuration: '2s' }}>🎉</div>
          <div className="absolute top-40 right-[15%] text-4xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}>🌟</div>
          <div className="absolute bottom-40 left-[8%] text-5xl animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '0.6s' }}>✨</div>
          <div className="absolute top-1/3 right-[5%] text-4xl animate-float">🎊</div>
          <div className="absolute bottom-1/4 right-[20%] text-4xl animate-float" style={{ animationDelay: '1s' }}>💝</div>
        </div>

        <Navbar />

        <main className="flex-1 flex items-center justify-center py-12 px-4 relative z-10">
          <div className="max-w-md w-full text-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center border border-gray-100 animate-slideInUp">
              {/* Animated checkmark circle */}
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-scaleIn">
                <CheckCircle className="w-12 h-12 text-white animate-heartBeat" />
              </div>

              <h1 className="font-bold text-4xl text-gray-800 mb-3 animate-slideInDown" style={{ animationDelay: '0.2s' }}>
                Thank You! 🎉
              </h1>

              <p className="text-gray-600 text-lg mb-8 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                Your feedback helps us make EduRights even better for kids like you!
              </p>

              <div className="text-6xl mb-8 animate-float">💙</div>

              <Button
                size="lg"
                className="gap-2 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
                style={{ animationDelay: '0.6s' }}
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFF8F0] via-[#FFF8F0] to-[#F0E7FF] relative overflow-hidden">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Floating emojis with better animations */}
        <div className="absolute top-24 left-[10%] text-5xl animate-float" style={{ animationDuration: '3s' }}>💬</div>
        <div className="absolute top-40 right-[15%] text-4xl animate-float" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>💙</div>
        <div className="absolute bottom-40 left-[8%] text-5xl animate-float" style={{ animationDuration: '2.8s', animationDelay: '1s' }}>⭐</div>
        <div className="absolute top-60 right-[10%] text-4xl animate-float" style={{ animationDuration: '3.2s', animationDelay: '1.5s' }}>✨</div>
        <div className="absolute bottom-60 right-[22%] text-5xl animate-float" style={{ animationDuration: '3.6s', animationDelay: '2s' }}>🌟</div>
        <div className="absolute top-1/2 left-[5%] text-4xl animate-float" style={{ animationDuration: '2.5s' }}>💖</div>
      </div>

      <Navbar />

      <main className="flex-1 py-8 md:py-12 relative z-10">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4">
          <div className="mx-auto max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 animate-slideInUp">
            {/* Header with staggered animations */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl shadow-lg mb-6 animate-scaleIn">
                <span className="text-5xl animate-spinGradient">💬</span>
              </div>
              <h1 className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-slideInDown">
                Share Your Thoughts!
              </h1>
              <p className="text-gray-600 text-lg animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                We love hearing from you! Your thoughts help us improve 💙
              </p>
            </div>

            {/* Feedback Form with input animations */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
                  <Label htmlFor="name" className="font-semibold text-gray-700">
                    Your Name (optional) 👋
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="What should we call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-500 feedback-form-input bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {/* Star Rating */}
                <div className="space-y-2 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                  <Label className="font-semibold text-gray-700">
                    How much do you like EduRights? ⭐
                  </Label>
                  <div className="flex items-center gap-3 justify-center py-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                        className="star-button transition-all duration-200"
                      >
                        <Star
                          className={`w-12 h-12 transition-all duration-300 ${star <= (hoveredRating || rating)
                            ? "text-secondary fill-secondary scale-110"
                            : "text-gray-300"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-center font-semibold text-purple-600 text-sm animate-slideInUp">
                      {rating === 5 && "🌟 Amazing! You're awesome!"}
                      {rating === 4 && "😊 Great! Thanks for the feedback!"}
                      {rating === 3 && "💪 Thanks! We'll make it better!"}
                      {rating === 2 && "🙏 We appreciate your honesty!"}
                      {rating === 1 && "💙 Help us improve!"}
                    </p>
                  )}
                </div>

                {/* Feedback Text */}
                <div className="space-y-2 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
                  <Label htmlFor="feedback" className="font-semibold text-gray-700">
                    Tell us what you think! 💭
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="What do you like? What could be better? Any ideas?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-32 rounded-xl border-2 border-gray-200 focus:border-purple-500 feedback-form-input bg-white/50 backdrop-blur-sm resize-none font-medium"
                    required
                  />
                  <p className="text-xs text-gray-500 font-medium">
                    ✨ Your feedback is super helpful! We read every message.
                  </p>
                </div>



                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-full py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
                  style={{ animationDelay: '0.7s' }}
                  disabled={!feedback.trim()}
                >
                  <Send className="w-5 h-5" />
                  Send Feedback
                  <span className="text-lg">🚀</span>
                </Button>
              </form>
            </div>

            {/* Fun message */}
            <p className="text-center text-sm text-gray-600 font-medium mt-8 animate-slideInUp" style={{ animationDelay: '0.8s' }}>
              ✨ Your opinion matters to us! Together we can make learning even more fun! 🌈
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;
