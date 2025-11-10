// GIA-CODE/gia-t-books/README.md

# Madoodle: An Interactive Storybook Platform

This project is a high-craft proof-of-concept for **Madoodle**, a mobile-first, interactive children's storybook platform. The initial release features the book **"Slimey,"** written by **Gia**. It is built on a robust foundation of modern web technologies to create a delightful, engaging, and scalable reading experience.

---

## 1. Core Principles

-   **Mobile-First Design:** Layouts, components, and interactions are designed for touch-based devices first, then gracefully enhanced for larger screens.
-   **High-Craft UI:** All interactions are designed to be smooth, intuitive, and visually polished, leveraging performant animations and a consistent design language.
-   **Component-Based Architecture:** The UI is composed of small, reusable, and accessible components built on top of Radix UI primitives.
-   **Simple & Scalable State:** Global state is managed with Zustand, ensuring a minimal, performant, and predictable state layer with built-in persistence.
-   **Building a Scalable Platform:** The architecture is designed from the ground up to support a full library of books, not just a single story.

## 2. Technology Stack

-   **Framework:** Next.js (with Static Site Generation)
-   **Language:** TypeScript
-   **Styling:** CSS Modules
-   **State Management:** Zustand
-   **Deployment:** GitHub Pages (via `gh-pages` package)

## 3. Directory Structure

-   **/public**: Contains all static assets (images, fonts, audio files) that are served directly to the browser.
-   **/src**: Contains all application source code.
-   **/src/books**: Contains self-contained book content modules, each with its own `data.json`.
-   **/src/features**: Contains major, user-facing areas of the application, organized into "vertical slices" (e.g., `/BookReader`, `/Library`).
-   **/src/data**: A single, consolidated directory for all non-visual logic, including the Zustand store, custom hooks, type definitions, and application-wide constants.
-   **/src/styles**: Contains the global styling architecture, including `globals.css` for resets and `fonts.css`.

## 4. Deployment to GitHub Pages

This project uses a manual deployment process that gives you full control over when updates go live.

1.  **Commit & Push:** Make your code changes and commit them to the `main` branch using your preferred Git client (e.g., VS Code's Source Control panel). This saves your work but does **not** make it live.
2.  **Deploy:** When you are ready to publish, run the following command in the terminal:
    ```bash
    npm run deploy
    ```
This command automatically builds the project and pushes the final static files to the `gh-pages` branch, which updates the live site.

## 5. Asset Inventory

This section provides specifications for the key visual assets required for the project.

| Asset                 | Description                                                               | Target Format | Aspect Ratio | Target Size (px) |
| --------------------- | ------------------------------------------------------------------------- | ------------- | ------------ | ---------------- |
| **Madoodle Logo**     | The main brand logo, displayed on the library page.                       | SVG           | N/A          | `250 x 60`       |
| **Book Cover Image**  | A unique, compelling cover for each book. Displayed in the `LibraryGrid`. | JPG / WebP    | `3:4`        | `600 x 800`      |
| **Page Illustration** | Full-page illustrations that accompany the story text.                    | JPG / WebP    | `4:3`        | `1600 x 1200`    |
| **Illustration Mask** | An artistic shape (e.g., watercolor splotch) used to frame illustrations. | SVG           | `1:1`        | `1000 x 1000`    |