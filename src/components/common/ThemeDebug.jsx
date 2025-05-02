import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const ThemeDebug = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [hasDarkClass, setHasDarkClass] = useState(false);

  useEffect(() => {
    // Only access document in useEffect (client-side)
    setHasDarkClass(document.documentElement.classList.contains("dark"));
    console.log("Current theme:", darkMode ? "dark" : "light");
    console.log(
      "HTML class contains dark:",
      document.documentElement.classList.contains("dark")
    );
  }, [darkMode]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
      <p className="mb-2 text-gray-900 dark:text-white">
        Theme: <strong>{darkMode ? "Dark" : "Light"}</strong>
      </p>
      <p className="mb-2 text-gray-900 dark:text-white">
        HTML class: <strong>{hasDarkClass ? "Has dark" : "No dark"}</strong>
      </p>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-purple-600 text-white rounded-md"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeDebug;
