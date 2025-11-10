// GIA-CODE/gia-t-books/STYLING.md

# High-Craft Styling Principles (CSS Modules)

This document codifies the core principles and patterns for writing CSS in the **gia-t-books** project. Adhering to these guidelines is essential for maintaining a consistent, robust, and high-craft user interface.

---

### Core Principles

#### 1. The CSS Modules Contract: Local by Default
Every React component that requires styling must have a co-located `[ComponentName].module.css` file. This guarantees that all class names are unique and scoped to that component only.

#### 2. The Global vs. Local Boundary
-   **Global (`src/styles/globals.css`):** Strictly for styles that MUST apply to the entire document. This includes CSS Resets, `@font-face` definitions, root-level CSS Custom Properties (variables), and base styles for raw HTML elements (`body`, `h1`, `p`).
-   **Local (`*.module.css`):** Everything else. All component-specific styles, layout logic, and variations belong in a CSS Module.

#### 3. Diagnose, Don't Guess
When debugging a UI issue, use the browser inspector to analyze the "Computed" styles. The final rendered DOM is the source of truth, not the JSX. Form a hypothesis based on CSS fundamentals and test it in the browser's style editor before writing code.

---

### Key Architectural Patterns

#### The Core Theming Contract
Our theming system (e.g., for light and dark modes) is built exclusively on CSS Custom Properties defined at the `:root` level in `globals.css`.

-   **The Contract:** All colors, fonts, and spacing units used in component stylesheets **must** reference a global variable (e.g., `color: var(--color-text);`). Do not use hard-coded hex codes or pixel values in components.
-   **The Benefit:** This ensures that all components will react instantly and consistently to theme changes. Adding a new theme is as simple as defining a new set of root variables.

#### The "Safe Zone" Padding Contract for Focus Rings
Any container component that must use `overflow: hidden` **must also provide an internal "safe zone" of padding** (typically `2px`) to accommodate the outer focus rings of its interactive children, preventing visual clipping and maintaining accessibility.

#### The Component Variable Contract
A component can measure its own dimensions and set that value as a CSS Custom Property on its root element (e.g., `--header-height: 60px;`). This allows parent or sibling components to create robust, decoupled layouts by referencing that variable (`padding-top: var(--header-height);`).