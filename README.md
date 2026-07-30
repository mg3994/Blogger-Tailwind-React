# 🚀 blogger-tailwind-react

> Passing blogger data there in react Example

A high-performance, monorepo template for building custom **Blogger (Blogspot) themes** using **React**, **Tailwind CSS**, and a custom JSX theme runtime (`@antinna/blogger-theme`).

---

## 🏗️ Architecture & Monorepo Workspaces

This project uses **TypeScript Project References** and a modular workspace architecture to separate UI preview logic, custom theme XML rendering, and Tailwind CSS compilation.

```text
blogger-tailwind-react/
├── app/                  # React preview application (UI components)
│   └── src/              # App source code (bundler target)
├── theme/                # Blogger XML engine & theme components
│   └── src/              # Custom JSX runtime (@antinna/blogger-theme)
├── style/                # Tailwind CSS workspace
│   └── src/
│       └── input.css     # Entry point for Tailwind directives & custom CSS
├── dist/                 # Root output directory (compiled XML & CSS)
├── tsconfig.json         # Root TypeScript solution orchestrator
├── tsconfig.app.json     # App workspace configuration (React + Bundler)
├── tsconfig.theme.json   # Theme workspace configuration (NodeNext + @antinna)
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json
```

---

## ✨ Key Features

- **📦 Monorepo Architecture:** Clean workspace separation across client UI (`app`), theme engine (`theme`), and CSS pipeline (`style`).
- **🎨 Custom JSX Engine:** Uses `@antinna/blogger-theme` as a custom JSX import source to transform React components directly into valid Blogger XML tags.
- **💅 Dedicated CSS Pipeline:** Processed Tailwind styling sourced from `style/src/input.css` and compiled into `dist/`.
- **⚡ Incremental Builds:** Powered by TypeScript Project References (`tsc -b`) for fast cross-workspace compilation.

---

## 🛠️ Workspace & TypeScript Breakdown

| Workspace | Source Directory      | Key Function / Configuration                                                       |
| :-------- | :-------------------- | :--------------------------------------------------------------------------------- |
| **Root**  | `./`                  | Solution orchestrator mapping project references (`tsconfig.json`)                 |
| **App**   | `app/src/**/*`        | React preview app using standard `react` JSX runtime (`tsconfig.app.json`)         |
| **Theme** | `theme/src/**/*`      | Custom theme engine using `@antinna/blogger-theme` runtime (`tsconfig.theme.json`) |
| **Style** | `style/src/input.css` | Tailwind CSS entry compiling directly to root `dist/`                              |

---

## 🚦 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) `>= 18.0.0`
- `npm`, `pnpm`, or `yarn`

### 2. Installation

Clone the repository and install dependencies:

> [https://github.com/Antinna/blogger-tailwind-react-workspace.git](https://github.com/Antinna/blogger-tailwind-react-workspace.git)

```bash
git clone https://github.com/Antinna/blogger-tailwind-react-workspace.git
cd blogger-tailwind-react-workspace
npm install
```

### 3. Local Development

Start the development environment (React preview + Tailwind watch mode):

```bash
npm run dev
```

---

## 📦 Building for Production

Compile all workspaces, bundle Tailwind CSS, and generate the final Blogger theme XML:

```bash
# Type check and build TypeScript references
tsc -b

# Build Tailwind CSS from style/src/input.css to dist/
npm run build:css

# Compile theme into root dist/ directory
npm run build
```

The compiled assets and standalone theme file will be placed in `dist/`.

---

## 📥 How to Install on Blogger

1. Go to your **Blogger Dashboard**.
2. Navigate to **Theme** in the left sidebar.
3. Click the dropdown menu next to **CUSTOMIZE** and select **Edit HTML**.
4. Upload the generated XML theme file from the `dist/` directory.
5. Save changes and preview your blog!

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
