// GIA-CODE/gia-t-books/AGENTS.md

# Agent Charter & Execution Protocol

This document defines the operating protocol for AI agents working on the **gia-t-books** codebase. Its purpose is to maximize the probability of a correct, complete, and architecturally sound "one-shot" outcome for any given task.

## Prime Directive: One-Shot Excellence

The agent's primary goal is to deliver a complete and correct solution in a single response. This is achieved by adhering to three pillars:

1.  **Holistic Analysis:** Synthesize **all** provided context: the user's request, documentation, and all relevant existing code files.
2.  **Systematic Diagnosis:** When faced with a bug, form multiple hypotheses, gather evidence from the codebase, and select a solution that definitively addresses the most likely root cause.
3.  **Comprehensive Delivery:** A "one-shot" response is a complete solution package: all necessary file operations, code modifications, documentation updates, and a strategic verification plan.

## Standard Execution Algorithm (Internal)

For any non-trivial task, the agent must follow this internal thought process *before* generating the final output:

1.  **Ingestion & Synthesis:** Read and fully comprehend the entire user request and all context files.
2.  **Impact Analysis & Dependency Mapping:** Create a definitive list of all files that will be Created, Read, Updated, or Deleted (CRUD).
3.  **Virtual Refactoring (The Mental Walkthrough):** Simulate the changes in the most critical files first.

    *   **Example Simulation (Styling):** *"I need to style the `BookCover` component. I will use the co-located `BookCover.module.css` file. I will apply `className={styles.coverImage}` to the `img` tag to ensure the styles are locally scoped."*

    *   **Example Simulation (Race Condition):** *"I am implementing a `useOnClickOutside` hook. The naive approach can cause a race condition. The correct architecture is to rely on `useEffect`'s post-paint execution guarantee, which ensures the event that opened the menu has already propagated."*

    *   **Example Simulation (Architectural Mismatch - REAL PROJECT EXAMPLE):** *"The request is to make custom `<interactive>` tags work. A naive solution is to use `html-react-parser`. **Hypothesis:** The parser's `replace` function is not working correctly. **Diagnosis:** I trace the parser's output and discover it doesn't recognize non-standard HTML tags; it discards them. My `replace` logic is never even called. **Conclusion:** The root cause is an architectural mismatch—we are using an HTML parser for a custom markup format. **The Correct Architecture:** A dedicated React component (`InteractiveText.tsx`) that uses a regular expression to parse the specific `[tag:value]content[/tag]` format. This is deterministic, reliable, and avoids fighting the tool's intended purpose."*

    *   **Example Simulation (Component Composition):** *"I need to add a Popover to a Button that already has a Tooltip. A naive wrapper causes conflicts. **Hypothesis:** Both Radix components use `asChild` and are competing for the button's events. **The Correct Architecture:** Per Radix documentation, nest the `Root` components (`<Popover.Root><Tooltip.Root>...`) and then nest their `Trigger` components. This ensures both components correctly attach their event listeners."*