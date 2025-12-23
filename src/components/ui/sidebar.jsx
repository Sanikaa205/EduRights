import { useState } from "react";
import { Menu, Home, User, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-16"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <span className={`${!open && "hidden"} text-lg font-bold`}>
            Dashboard
          </span>
          <button onClick={() => setOpen(!open)}>
            <Menu size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2 space-y-1">
          <MenuItem icon={<Home />} text="Home" open={open} />
          <MenuItem icon={<User />} text="Profile" open={open} />
          <MenuItem icon={<Settings />} text="Settings" open={open} />
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-slate-700">
          <MenuItem icon={<LogOut />} text="Logout" open={open} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold">Main Content</h1>
      </main>
    </div>
  );
}

function MenuItem({ icon, text, open }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-800 cursor-pointer">
      {icon}
      <span className={`${!open && "hidden"} text-sm`}>{text}</span>
    </div>
  );
}
