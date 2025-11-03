import React from "react";

export default function LoadingButton({ loading, children, disabled, ...rest }) {
  const isDisabled = loading || disabled;
  return (
    <button
      disabled={isDisabled}
      className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-lg transition-all duration-200 transform ${
        isDisabled
          ? "bg-gradient-to-r from-indigo-400 to-purple-400 cursor-not-allowed"
          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 active:scale-95"
      }`}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
