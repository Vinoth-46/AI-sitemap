import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const Homepage = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center p-6 transition-colors duration-500
        ${darkMode 
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white" 
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"}`}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm
        bg-black/10 dark:bg-white/10 hover:scale-105 transition"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 className="text-6xl font-extrabold mb-4">AI Sitemap Builder</h1>
      <p className="text-xl max-w-xl mb-8 opacity-80">
        Turn your app ideas into beautiful sitemaps instantly using AI 🤖
      </p>
      <Link
        to="/generator"
        className="px-6 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full"
      >
        Generate Your Sitemap ✈️
      </Link>
    </div>
  );
};

export default Homepage;
