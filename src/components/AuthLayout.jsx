import React from "react";

export default function AuthLayout({ children, maxWidth = "md" }) {
  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" 
          style={{ animationDelay: "1s" }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" 
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-ping" style={{ animationDuration: "3s" }}></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-ping" style={{ animationDuration: "5s", animationDelay: "2s" }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-ping" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-20 right-10 w-32 h-32 border-4 border-indigo-300 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-purple-300 rotate-12 rounded-lg"></div>
      </div>

      <div className={`w-full ${widthClasses[maxWidth]} relative z-10`}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-20 animate-pulse" style={{ animationDuration: "4s" }}></div>
        
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 border border-white/30 hover:shadow-3xl transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-indigo-200 rounded-tl-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-purple-200 rounded-br-3xl opacity-50"></div>
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
          
          <div className="relative">
            {children}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-50"></div>
    </div>
  );
}