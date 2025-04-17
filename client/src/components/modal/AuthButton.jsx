export default function AuthButton({ icon, text, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      type="button"
     className="w-full flex items-center justify-between border border-slate-300 cursor-pointer rounded p-4 px-2 hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </div>
     
    </button>
  );
}
