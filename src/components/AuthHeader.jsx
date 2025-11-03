import React from "react";

export default function AuthHeader({ logoSrc, title, subtitle, logoSize = 24 }) {
  const sizeClass = `w-${logoSize} h-${logoSize}`;
  return (
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center w-24 h-24 mb-4">
        <img src={logoSrc} alt="Logo" className="w-full h-full object-contain" />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
  );
}
