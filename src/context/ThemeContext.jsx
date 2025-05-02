import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage or prefers dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // We need to check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      // If no localStorage value, check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false; // Default to light mode
  });

  // Function to apply theme to document
  const applyTheme = (isDark) => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      try {
        if (isDark) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      } catch (error) {
        console.error("Error applying theme:", error);
      }
    }
  };

  // Apply theme class to document immediately on mount
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return; // Exit early if not in browser environment
    }

    // Initial application of theme
    applyTheme(darkMode);

    try {
      // Add event listener for system preference changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        if (localStorage.getItem("theme") === null) {
          setDarkMode(e.matches);
        }
      };

      // Add listener (with compatibility check)
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
      } else if (mediaQuery.addListener) {
        // For older browsers
        mediaQuery.addListener(handleChange);
      }

      // Cleanup
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleChange);
        } else if (mediaQuery.removeListener) {
          // For older browsers
          mediaQuery.removeListener(handleChange);
        }
      };
    } catch (error) {
      console.error("Error setting up theme listener:", error);
      return () => {}; // Return empty cleanup function
    }
  }, [darkMode]);

  // Update the theme when darkMode changes
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      applyTheme(darkMode);
    }
  }, [darkMode]);

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
