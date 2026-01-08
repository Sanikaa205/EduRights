export default function RightRevealCard({ right }) {
  if (!right) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="font-bold text-lg mb-2">🎯 Right Unlocked!</h2>
      <p className="font-semibold mb-1">{right.right}</p>
      <p className="text-muted-foreground text-sm">{right.explanation}</p>
    </div>
  );
}
