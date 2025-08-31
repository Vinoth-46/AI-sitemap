import React, { useState } from "react";
import { Folder, FolderOpen, File, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";

const TreeView = ({ data }) => (
  <motion.ul
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="pl-4 border-l border-gray-400 dark:border-gray-600"
  >
    {Object.entries(data).map(([key, value]) => (
      <CollapsibleNode key={key} name={key} childrenData={value} />
    ))}
  </motion.ul>
);

const CollapsibleNode = ({ name, childrenData }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = Object.keys(childrenData).length > 0;

  return (
    <li className="my-1">
      <div
        className="flex items-center space-x-2 cursor-pointer select-none"
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          open ? (
            <FolderOpen className="w-4 h-4 text-yellow-500" />
          ) : (
            <Folder className="w-4 h-4 text-yellow-500" />
          )
        ) : (
          <File className="w-4 h-4 text-blue-500" />
        )}
        <span>{name}</span>
      </div>

      <AnimatePresence>
        {hasChildren && open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TreeView data={childrenData} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const Generatorpages = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [idea, setIdea] = useState("");
  const [sitemap, setSitemap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // 🎤 Voice Input
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIdea(transcript);
    };

    recognition.start();
  };

  const generate = async () => {
    if (!idea.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: [
            {
              role: "user",
              content: `Generate a sitemap in clean JSON format for: ${idea}.
              Only provide the JSON response without any extra text or explanation.
              Example: {"Home": {}, "About": {}, "Dashboard": {"Profile": {}, "Settings": {}}, "Contact": {}}`,
            },
          ],
        }),
      });

      const data = await res.json();
      const raw = data?.choices?.[0]?.message?.content || "";

      try {
        setSitemap(JSON.parse(raw));
      } catch {
        setSitemap(null);
      }
    } catch (err) {
      console.error(err);
      setSitemap(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 transition-colors duration-500 
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

      <h2 className="text-3xl font-bold mb-6">💭 Describe your App</h2>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="E.g. A social media app for pet lovers"
        className="w-full max-w-2xl p-4 rounded border border-gray-400 dark:border-gray-600 mb-4
        bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white"
      />

      <div className="flex space-x-4 mb-8">
        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full disabled:opacity-50"
          onClick={generate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Sitemap 🧭"}
        </button>

        <button
          onClick={startListening}
          className={`px-6 py-3 rounded-full flex items-center space-x-2 
            ${listening ? "bg-red-500 animate-pulse" : "bg-green-500 hover:bg-green-600"}`}
        >
          <Mic className="w-5 h-5" />
          <span>{listening ? "Listening..." : "Voice Input"}</span>
        </button>
      </div>

      <div className="w-full max-w-2xl rounded p-4 shadow-lg
        bg-white/90 dark:bg-gray-800/90 text-left">
        <h3 className="text-2xl font-bold mb-2">Generated Sitemap</h3>
        {sitemap ? (
          <TreeView data={sitemap} />
        ) : (
          <p className="opacity-70">Your generated sitemap will appear here...</p>
        )}
      </div>
    </div>
  );
};

export default Generatorpages;
