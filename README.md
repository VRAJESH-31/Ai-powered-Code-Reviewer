-----

# 🤖 AI-Powered Code Reviewer



[](https://opensource.org/licenses/MIT)
[](https://github.com/VRAJESH-31/Ai-powered-Code-Reviewer)
[](https://www.google.com/search?q=https://github.com/VRAJESH-31/Ai-powered-Code-Reviewer/stargazers)

An intelligent code reviewer that leverages the power of generative AI to analyze your code, provide feedback, and suggest improvements. This full-stack application provides a simple web interface for you to paste your code and receive instant reviews.

-----

## 📍 Overview

This project aims to automate the code review process by integrating a powerful generative AI. Developers can simply paste their code into a user-friendly web interface, select the programming language, and receive an in-depth analysis covering potential bugs, style inconsistencies, and suggestions for improvement. It's designed to help developers write cleaner, more efficient, and error-free code, thereby boosting productivity and code quality.

-----

## ✨ Features

  * **⚡ Instant Code Analysis**: Get AI-generated feedback on your code in seconds.
  * **🌐 Multi-Language Support**: Supports a wide range of programming languages including JavaScript, Python, Java, C++, and HTML.
  * **💻 Interactive Code Editor**: A clean and intuitive code editor powered by CodeMirror, featuring syntax highlighting for an enhanced user experience.
  * **📱 Responsive UI**: A modern and responsive user interface built with React and Tailwind CSS, ensuring a seamless experience across all devices.
  * **📄 Markdown Support**: The AI's feedback is rendered as Markdown, allowing for rich text formatting like code blocks, lists, and bold text for better readability.

-----

## 🛠️ Tech Stack

This project is a monorepo containing a separate frontend and backend.

### Frontend

| Technology                                                                                                | Description                                           |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [**React**](https://reactjs.org/)                                                                         | A JavaScript library for building user interfaces.    |
| [**Vite**](https://vitejs.dev/)                                                                           | A fast build tool for modern web development.         |
| [**Tailwind CSS**](https://tailwindcss.com/)                                                              | A utility-first CSS framework for rapid UI development. |
| [**CodeMirror**](https://codemirror.net/)                                                                 | A versatile text editor implemented in JavaScript.    |
| [**Axios**](https://axios-http.com/)                                                                      | A promise-based HTTP client for the browser and Node.js.  |
| [**React Markdown**](https://github.com/remarkjs/react-markdown)                                            | A component to render Markdown as React elements.     |

### Backend

| Technology                                                                                                    | Description                                                                 |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [**Node.js**](https://nodejs.org/)                                                                            | A JavaScript runtime built on Chrome's V8 JavaScript engine.                |
| [**Express**](https://expressjs.com/)                                                                         | A minimal and flexible Node.js web application framework.                   |
| [**Google Generative AI**](https://ai.google.dev/)                                                            | The AI service used for code analysis and review. (inferred)                |
| [**CORS**](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)                                                | A middleware to enable Cross-Origin Resource Sharing.                       |
| [**Dotenv**](https://github.com/motdotla/dotenv)                                                                | A zero-dependency module that loads environment variables from a `.env` file. |

-----

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  * Node.js (v18 or higher recommended)
  * npm (or your favorite package manager)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/VRAJESH-31/Ai-powered-Code-Reviewer.git
    cd Ai-powered-Code-Reviewer
    ```

2.  **Set up the Backend:**

      * Navigate to the backend directory:
        ```bash
        cd backend
        ```
      * Install the dependencies:
        ```bash
        npm install
        ```
      * Create a `.env` file in the `backend` directory and add your environment variables. You will need an API key from Google AI Studio.
        ```env
        API_KEY=YOUR_GOOGLE_AI_API_KEY
        PORT=3000
        ```
      * Start the server:
        ```bash
        npm run start
        ```
        The backend server will be running on `http://localhost:3000`.

3.  **Set up the Frontend:**

      * Navigate to the frontend directory from the root folder:
        ```bash
        cd ../frontend
        ```
      * Install the dependencies:
        ```bash
        npm install
        ```
      * Start the development server:
        ```bash
        npm run dev
        ```
        The frontend application will be available at `http://localhost:5173` (or another port if 5173 is busy).

-----

## ☁️ Deployment

This application is designed to be deployed as two separate services.

### Backend Deployment (Render)

1.  Create a new **Web Service** on Render and connect your GitHub repository.
2.  Set the following configuration:
      * **Root Directory**: `backend`
      * **Build Command**: `npm install`
      * **Start Command**: `node server.js`
3.  Add your `API_KEY` under the **Environment Variables** section.
4.  Deploy the service.

### Frontend Deployment (Vercel)

1.  Create a new **Project** on Vercel and import your GitHub repository.
2.  Set the following configuration:
      * **Framework Preset**: Vite
      * **Root Directory**: `frontend`
3.  Vercel will automatically detect and configure the build settings.
4.  Deploy the project.

-----

## 🤝 How to Use

1.  Open the web application in your browser.
2.  Select the programming language of your code snippet from the dropdown menu.
3.  Paste your code into the interactive editor.
4.  Click the **"Review Code"** button.
5.  View the AI-generated feedback and suggestions in the output panel.

-----
