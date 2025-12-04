# Project Context

**Madoodle** is a high-craft, mobile-first interactive storybook platform. The codebase (`gia-t-books`) is a Next.js application designed to be scalable, performant, and visually delightful.

## Architecture
-   **Framework**: Next.js (SSG)
-   **State**: Zustand (Global state, minimal & performant)
-   **Styling**: CSS Modules + Global Variables (No Tailwind, no CSS-in-JS libraries like styled-components)
-   **UI Components**: Radix UI primitives for accessibility and behavior.
-   **Deployment**: GitHub Pages

## Key Directories
-   `src/books/`: Self-contained book content modules.
-   `src/features/`: Vertical slices of user-facing functionality (e.g., `BookReader`, `Library`).
-   `src/data/`: Non-visual logic (Zustand stores, hooks, types, constants).
-   `src/components/`: Shared, reusable UI components.
-   `src/styles/`: Global styling manifest (`index.css`, `variables.css`, etc.).
-   `public/`: Static assets (images, audio).

## Standards

### Styling (Critical)
-   **Hybrid Strategy**: Use `src/styles/index.css` for global styles (variables, resets, fonts) and `*.module.css` for component styles.
-   **Local by Default**: Every component MUST have a co-located `*.module.css`.
-   **Global Variables**: Use CSS variables for colors, fonts, and spacing (defined in `variables.css`).
-   **No Hardcoded Values**: Avoid magic numbers or hex codes in component styles.
-   **Mobile-First**: Design for touch first, then enhance.

### State Management
-   **Zustand**: Use atoms/stores for global state.
-   **Derived State**: Compute derived data in selectors or hooks, not in the store itself if possible.

### Code Quality
-   **Types**: Strict TypeScript usage.
-   **Linting**: Run `npm run lint` to catch issues.

## Common Commands
-   `npm run dev`: Start development server (syncs assets first).
-   `npm run build`: Production build (validates content & syncs assets).
-   `npm run deploy`: Deploy to GitHub Pages.
-   `npm run validate`: Validate book content integrity.

---

# Agent Charter & Execution Protocol

## Prime Directive: One-Shot Excellence
The agent's primary goal is to deliver a complete and correct solution in a single response.

1.  **Holistic Analysis**: Synthesize **all** context (user request, docs, code).
2.  **Systematic Diagnosis**: Form hypotheses, gather evidence, and identify root causes.
3.  **Comprehensive Delivery**: Provide a complete solution package (code, docs, verification).

## Standard Execution Algorithm
1.  **Ingestion**: Read and comprehend the request and context.
2.  **Impact Analysis**: Identify all CRUD files.
3.  **Virtual Refactoring**: Simulate changes mentally before writing code.
    -   *Trace data flows.*
    -   *Check for race conditions.*
    -   *Verify architectural fit.*

## Critical Rules
-   **Do NOT use `replace_file_content` for large blocks** if only changing one line.
-   **Verify paths**: Do not guess. Check `src/types.ts` vs `src/data/types.ts`.
-   **Lint proactively**: Run linting after refactoring.
