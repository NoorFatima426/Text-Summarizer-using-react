import { FileText } from "lucide-react";
import { useState } from "react";
import { Copy } from "lucide-react";
import { jsPDF } from "jspdf";
import { ArrowDown } from "lucide-react";
function Summarize({ summaryText, loading, downloadError, handleDownload }) {
  let [msg, setMsg] = useState("");
  const copiedData = async () => {
  if (summaryText.length !== 0) {
    try {
      await navigator.clipboard.writeText(summaryText); 
      setMsg("Copied");
      setTimeout(() => setMsg(""), 2000);
    } catch (error) {
      setMsg("Failed to copy!"); 
    }
  }
};
  if (loading) {
    return (
      <p className="font-bold text-center text-xl text-indigo-500 p-5">
        Summarizing...
      </p>
    );
  }
  return (
    <div className="px-2 py-1 rounded border border-gray-200">
      <div className="flex items-center gap-3">
        <p>
          <FileText className="text-indigo-500" />
        </p>
        <div>
          <p className="text-indigo-500 text-lg font-bold">2. Summary</p>
          <p className="text-sm text-gray-500">
            Your summarize text will appear here
          </p>
        </div>
      </div>
      <div className="px-7 py-2 relative">
        <div className="w-100 h-90 border border-gray-500 bg-indigo-200 rounded text-gray-500 py-3 px-5 overflow-y-auto">
          <p className="overflow-y-auto text-sm max-h">{summaryText}</p>
          <div className="flex flex-wrap items-center gap-2 absolute bottom-7.5 right-15">
            <Copy onClick={copiedData} className="cursor-pointer " />
            {msg && <p className="text-sm text-gray-500">Copied!</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap space-x-40">
        <div>
          <p className="text-sm text-gray-500 px-9">
            {summaryText.length} / 5000 characters
          </p>
          <p className="text-sm text-gray-500 px-9">
            {summaryText.trim() === "" ? 0 : summaryText.split(" ").length}{" "}
            words
          </p>
        </div>
        <div>
          <button
            onClick={handleDownload}
            className="
      bg-indigo-500 border text-sm text-white py-2 px-1 rounded hover:border-indigo-500 hover:text-indigo-500 hover:bg-white
"
          >
            <span className="flex items-center gap-1 text-sm">
              <ArrowDown />
              Download PDF
            </span>
          </button>
          <br />
          <p className="text-md font-bold text-red-500">
            {summaryText.length === 0 ? downloadError : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Summarize;
