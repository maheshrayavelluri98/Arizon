import React, { useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle = ({ className = "" }) => {
  const { darkMode, toggleTheme } = useTheme();

  const handleToggle = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    },
    [toggleTheme]
  );

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        darkMode ? "bg-purple-600" : "bg-gray-300"
      } ${className}`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      {/* Sun icon */}
      <SunIcon
        className={`absolute left-1.5 h-4 w-4 text-yellow-400 transition-opacity ${
          darkMode ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Moon icon */}
      <MoonIcon
        className={`absolute right-1.5 h-4 w-4 text-slate-200 transition-opacity ${
          darkMode ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Toggle knob */}
      <span
        className={`${
          darkMode ? "translate-x-9" : "translate-x-1"
        } inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out`}
      />

      <span className="sr-only">{darkMode ? "Dark Mode" : "Light Mode"}</span>
    </button>
  );
};

export default ThemeToggle;
