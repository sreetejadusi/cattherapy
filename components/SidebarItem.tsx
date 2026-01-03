export default function SidebarItem({
  icon: Icon,
  label,
  active = false,
  time,
}: any) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${
        active
          ? "bg-gray-100 text-gray-900"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }
    `}
    >
      <Icon size={18} className="opacity-70 group-hover:opacity-100" />
      <span className="text-sm font-medium flex-1 text-left">{label}</span>
      {time && <span className="text-xs text-gray-400 font-light">{time}</span>}
    </button>
  );
}
