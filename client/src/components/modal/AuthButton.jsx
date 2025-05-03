export default function AuthButton({ icon, text, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full flex items-center justify-between border border-slate-300 dark:border-neutral-600 cursor-pointer rounded p-4 px-2 hover:bg-gray-100 dark:hover:bg-neutral-700 bg-white dark:bg-neutral-800"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl text-black dark:text-white">{icon}</span>
        <span className="text-sm font-medium text-black dark:text-white">{text}</span>
      </div>
    </button>
  );
}
