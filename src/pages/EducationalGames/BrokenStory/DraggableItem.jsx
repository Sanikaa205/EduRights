export default function DraggableItem({ item, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item.id)}
      disabled={item.placed}
      className={`text-left p-3 rounded-md border w-full ${item.placed ? 'opacity-50 line-through' : 'hover:bg-slate-50'}`}
    >
      {item.text}
    </button>
  )
}
