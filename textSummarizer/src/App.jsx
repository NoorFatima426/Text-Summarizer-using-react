import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Input from "./Input";
import Summarize from "./Summarize";
import { jsPDF } from "jspdf";

function App() {
  let [inputData, setInputData] = useState("");
  let [summaryText, setSummaryText] = useState("");
  let [selected, setSelected] = useState("short");
  let [loading, isLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let [downloadError, setDownloadError] = useState("");
  const getInput = (e) => {
    if (inputData.length < 5000 || e.target.value.length < inputData.length) {
      setInputData(e.target.value);
    }
  };
 const handleDownload = () => {
    if (summaryText.length === 0) {
      setDownloadError("Empty Field");
      setTimeout(() => {
        setDownloadError("");
      }, 3000);
      return;
    }

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height; 
    const margin = 10;
    const lineHeight = 7;
    const maxWidth = 180;

    let split = doc.splitTextToSize(summaryText, maxWidth);

    let y = margin;

    split.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage(); 
        y = margin;    
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save("summary.pdf");
    setSummaryText("");
  };
  async function summarizeInput() {
    if (inputData.trim() === "") {
      setErrorMsg("Add some text");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }
    isLoading(true);
    let contentText;
    if (selected === "short") {
      contentText = `Summarize in EXACTLY 30 words or less. Do not exceed 30 words.Do not mention the word count in your response. text: ${inputData}`;
    } else if (selected === "medium") {
      contentText = `Summarize in EXACTLY 50 words or less. Do not exceed 50 words.Do not mention the word count in your response. text: ${inputData}`;
    } else {
      contentText = `Summarize in EXACTLY 90 words or less. Do not exceed 90 words.Do not mention the word count in your response. text: ${inputData}`;
    }

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
          },
          body: JSON.stringify({
            model: "openrouter/auto",
            messages: [
              {
                role: "user",
                content: contentText,
              },
            ],
          }),
        },
      );
      const data = await response.json();
      console.log(data);
      const content = data.choices[0].message.content;
      setSummaryText(content);
      setInputData("");
    } catch (error) {
      setSummaryText("Error! 404");
    } finally {
      isLoading(false);
    }
  }
  return (
    <>
      <div className="p-4 items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm">
        <Header />
        <div className="flex flex-wrap gap-10">
          <Input
            getInput={getInput}
            inputData={inputData}
            selected={selected}
            setSelected={setSelected}
            summarizeInput={summarizeInput}
            loading={loading}
            errorMsg={errorMsg}
          />
          <Summarize
            summaryText={summaryText}
            loading={loading}
            downloadError={downloadError}
            handleDownload={handleDownload}
          />
        </div>
      </div>
    </>
  );
}

export default App;
