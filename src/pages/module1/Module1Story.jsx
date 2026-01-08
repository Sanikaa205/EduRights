

export default function Module1Story() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const current = story.pages[page];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f7f3e8] via-[#f6e7e1] to-[#e2c799]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white/80 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src={current.image}
            alt="Story illustration"
            className="rounded-xl shadow-lg w-full md:w-1/2 h-auto object-contain"
            style={{ maxHeight: 320 }}
          />
          <div className="w-full md:w-1/2 font-serif text-[1.5rem] font-bold text-[#4b3f2a] leading-relaxed tracking-wide" style={{ fontFamily: 'Playfair Display, Merriweather, serif' }}>
            {current.text.map((line, i) => (
              <p key={i} className="mb-4" style={{ lineHeight: 1.5 }}>{line}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-8">
          {page > 0 && (
            <Button onClick={() => setPage(page - 1)}>
              ◀ Previous
            </Button>
          )}
          {page < story.pages.length - 1 ? (
            <Button onClick={() => setPage(page + 1)}>
              Next ▶
            </Button>
          ) : (
            <Button onClick={() => navigate("/module-1/explanation")}> 
              Finish 📘
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
