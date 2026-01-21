# AI Sitemap Generator

A modern web application that leverages artificial intelligence to generate comprehensive XML sitemaps for websites. Built with React and featuring an intuitive user interface with smooth animations.

## Problem Statement

Creating accurate and complete sitemaps manually is time-consuming and error-prone. This application automates the sitemap generation process using AI-powered crawling and analysis, ensuring no important pages are missed while excluding irrelevant content.

## Features

- AI-powered website crawling and analysis
- Automatic XML sitemap generation
- Real-time progress tracking with visual feedback
- Support for multiple URL formats and structures
- Export sitemaps in standard XML format
- Responsive design for desktop and mobile
- Smooth animations and intuitive UI

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | Frontend framework |
| Vite | Build tool and dev server |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | Animations and transitions |
| React Router | Client-side routing |
| Lucide React | Icon library |

## Folder Structure

```
AI-sitemap/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── Pages/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Setup and Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Steps

```bash
# Clone the repository
git clone https://github.com/Vinoth-46/ai-sitemap.git

# Navigate to project directory
cd ai-sitemap

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_api_key_here
```

## Screenshots

_Screenshots will be added here_

## Future Enhancements

- Scheduled sitemap generation
- Multiple sitemap format support (HTML, TXT)
- Sitemap validation and error reporting
- Integration with Google Search Console
- Batch processing for multiple websites
- Priority and frequency customization

## Author

**Vinoth**

- GitHub: [@Vinoth-46](https://github.com/Vinoth-46)
- LinkedIn: [Vinoth](https://www.linkedin.com/in/vinoth465/)

---

_Built with React and AI_
