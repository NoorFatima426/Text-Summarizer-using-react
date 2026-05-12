import { Pencil } from "lucide-react";
import { Sparkle } from "lucide-react";
import { useState } from "react";
import "./App.css";

function Input({
  getInput,
  inputData,
  selected,
  setSelected,
  summarizeInput,
  loading,
  errorMsg,
}) {
  let shortClass =
    selected === "short"
      ? "border-2 border-indigo-500 text-indigo-500"
      : "border-gray-500 text-gray-500";
  let mediumClass =
    selected === "medium"
      ? "border-2 border-indigo-500 text-indigo-500"
      : "border-gray-500 text-gray-500";
  let longClass =
    selected === "long"
      ? "border-2 border-indigo-500 text-indigo-500"
      : "border-gray-500 text-gray-500";
  return (
    <div className="p-2 rounded border border-gray-200">
      <div className="flex gap-3 items-center">
        <div className="flex gap-3">
          <p>
            <Pencil className="text-indigo-500 border rounded-sm border-none my-3 p-1 w-7 h-7.5 flex items-center justify-center shrink-0" />
          </p>
          <div>
            <p className="text-indigo-500 text-lg font-bold  ">
              1. Enter your text
            </p>
            <p className="text-sm text-gray-500">
              Paste or type the text you want to summarzie
            </p>
          </div>
        </div>
      </div>
      <div className="px-7 py-4 w-100">
        <textarea
          name=""
          id=""
          rows="10"
          cols="50"
          w-100
          min-w-xs
          placeholder="Paste your test here"
          className="p-2 text-sm border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
          onChange={getInput}
          value={inputData}
        ></textarea>
        {inputData.length > 5000 ? (
          <p className="text-sm font-bold text-red-500 px-2">Limit Exceed</p>
        ) : (
          ""
        )}

        <p className="text-sm text-gray-500 px-2">
          {inputData.length} / 5000 characters
        </p>
        <p className="text-sm text-gray-500 px-2">
          {inputData.trim() === "" ? 0 : inputData.split(" ").length} words
        </p>
      </div>
      <div>
        <p className="text-indigo-500 text-md font-bold px-7 py-3">
          Summary Length
        </p>
        <div className="flex space-x-23">
          <div className="btn flex gap-1 px-7 ">
            <button
              onClick={() => {
                setSelected("short");
              }}
              className={`bg-white border border-gray-500 hover:border-indigo-500 hover:text-indigo-500 text-gray-700  py-2 px-3 rounded ${shortClass} `}
            >
              Short
            </button>
            <button
              onClick={() => {
                setSelected("medium");
              }}
              className={`bg-white border border-gray-500 hover:border-indigo-500 hover:text-indigo-500 text-gray-700  py-2 px-4 rounded ${mediumClass}`}
            >
              Medium
            </button>
            <button
              onClick={() => {
                setSelected("long");
              }}
              className={`bg-white border border-gray-500 hover:border-indigo-500 hover:text-indigo-500 text-gray-700  py-2 px-4 rounded ${longClass}`}
            >
              Long
            </button>
          </div>
          <div>
            <button
              onClick={summarizeInput}
              disabled={loading || inputData.length > 5000}
              className="
      bg-indigo-500 border text-sm text-white py-2 px-1 rounded hover:border-indigo-500 hover:text-indigo-500 hover:bg-white
       disabled:bg-gray-500 disabled:text-white "
            >
              <span className="flex items-center gap-1 text-sm">
                <Sparkle />
                Summarize
              </span>
            </button>
            <br />
            <p className="text-md font-bold text-red-500">
              {inputData.length === 0 ? errorMsg : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Input;
