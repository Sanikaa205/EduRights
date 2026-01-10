import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Module6Start = () => {
  const [openBook, setOpenBook] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("openBook") === "true") {
      setOpenBook(true);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main
        className={`flex-1 flex items-center justify-center px-4 transition-all duration-500 ${
          openBook ? "blur-md brightness-50 saturate-50" : ""
        }`}
      >
        {!openBook && (
          <div className="text-center max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Right to Be Heard
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Learn your rights through an interactive storybook
            </p>
            <button
              onClick={() => setOpenBook(true)}
              className="px-10 py-4 text-xl font-semibold bg-primary text-white rounded-2xl shadow-lg hover:scale-105 transition"
            >
              📖 Start Module
            </button>
          </div>
        )}
      </main>
      {openBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_70%)]"
        >
          <HTMLFlipBook
            width={440}
            height={600}
            showCover={true}
            className="shadow-2xl"
            onFlip={(e) => {
              // page index based
            }}
          >
            {/* FRONT COVER */}
            <img src="/canva-book/module6/cover.png" />
            {/* INNER PAGES (REAL BOOK = PAIRS) */}
            <img src="/canva-book/module6/page-1.png" />
            <img src="/canva-book/module6/page-2.png" />
            <img src="/canva-book/module6/page-3.png" />
            <img src="/canva-book/module6/page-4.png" />
            <img src="/canva-book/module6/page-5.png" />
            <img src="/canva-book/module6/page-6.png" />
            <img src="/canva-book/module6/back.png" />
          </HTMLFlipBook>
          <div className="absolute bottom-8">
            <button
              onClick={() => navigate("/module-6/explanation")}
              className="px-8 py-3 bg-primary text-white text-lg rounded-xl shadow-lg hover:scale-105 transition"
            >
              Continue →
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Module6Start;
