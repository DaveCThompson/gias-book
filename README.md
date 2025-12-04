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
-   **Styling:** CSS Modules + `oklch` Color System (High-fidelity, accessible theming)
-   **State Management:** Zustand
-   **Deployment:** GitHub Pages (via `gh-pages` package)

## 3. Developer Guide

For detailed information on the codebase structure, architecture, standards, and agent protocols, please refer to **[agents.md](./agents.md)**.

## 4. Deployment to GitHub Pages

This project uses a manual deployment process that gives you full control over when updates go live.

1.  **Commit & Push:** Make your code changes and commit them to the `main` branch using your preferred Git client.
2.  **Deploy:** When you are ready to publish, run the following command in the terminal:
    ```bash
    npm run deploy
    ```
This command automatically builds the project and pushes the final static files to the `gh-pages` branch.

## 5. Asset Inventory

This section provides specifications for the key visual and audio assets required for the project.

| Asset                 | Description                                                               | Target Format | Aspect Ratio | Target Size (px) |
| --------------------- | ------------------------------------------------------------------------- | ------------- | ------------ | ---------------- |
| **Madoodle Logo**     | The main brand logo, displayed on the library page.                       | SVG           | N/A          | `250 x 60`       |
| **Book Cover Image**  | A unique, compelling cover for each book. Displayed in the `LibraryGrid`. | JPG / WebP    | `3:4`        | `600 x 800`      |
| **Page Illustration** | Full-page illustrations that accompany the story text.                    | JPG / WebP    | `4:3`        | `1600 x 1200`    |
| **Illustration Mask** | An artistic shape (e.g., watercolor splotch) used to frame illustrations. | SVG           | `1:1`        | `1000 x 1000`    |
| **Narration Audio**   | Voiceover for each page.                                                  | M4A / MP3     | N/A          | Optimized        |

## 6. Validation

Content integrity is critical. Before building, the project validates all book data:

```bash
npm run validate
```

This checks `data.json` files against the schema to ensure all required fields (like `mood`, `text`, `pageNumber`) are present and correct.