function Header() {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="bg-indigo-500 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <div>
        <p className="text-lg font-bold text-gray-900">AI Text Summarizer</p>
        <p className="text-sm text-gray-500">
          Summarize long text into short, meaningful content
        </p>
      </div>
    </div>
  );
}
export default Header;
