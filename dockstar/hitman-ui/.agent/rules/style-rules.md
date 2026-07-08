## Styling & CSS Rules

1. Use TailwindCSS utility classes or custom SCSS classes.
2. Do not use inline CSS; always use named classes or Tailwind utilities.
3. Keep CSS modular (use `.scss`).
4. Each component must have its own `.scss`.
5. Use "-" seperated class names.
6. Strictly use already present variables for colors, fonts etc.
   - default-background-color - default-text-color - default-border-color - default-border-radius
7. Use minimal colors only provided colors from the variables.
8. Use classes from utility css classes from `src/components/main/scss/_utility.scss`.
9. Use `src/components/main/scss/_variables.scss` for variables.
10. Use `src/components/main/scss/_darktheme.scss` for dark mode css update for external libraries.

# DESIGN CONSTITUTION

## Prime Directive

Design = **maximum clarity with minimum UI**. Remove friction until intent is obvious. If it's not necessary for the current intent, it must not exist.

## Decision Order (Always)

1. **Single intent** per screen
2. **Visual hierarchy** (first / second / last)
3. **Reduction** (remove without losing meaning) Multiple intents = invalid design.

## First-Principles Laws

- Clarity > Features
- Flow > Flexibility
- Meaning > Options If the user has to think, redesign.

## Golden Ratio Law

When dividing space or attention:

- Use **~62% / 38%** dominance
- One side must clearly lead
- Symmetry only when intent is equal Balance = visual weight, not equality.

## Layout Rules

- Flow: **top → bottom**, broad → narrow
- Hierarchy before components
- Containers may be centered
- **Content is always left-aligned**

## Geometry System

Hybrid geometry:

- Default: sharp
- If friction → fully rounded
- Else → semi-rounded Rounded = interactive Sharp = structural Consistency > preference.

## Autofocus law

The system assigns focus to the primary input on opening of side panel or any screen. Eliminating the need for an initial click.

## Content alignment

Primary contet is centered within the canvas Content inside the container will be left aligned

## Density Rules

- <15 items → cards
- ≥15 items → list / table Scanning beats decoration.

## Empty State Law

Empty space must:

- Explain purpose
- Indicate next action No silent emptiness.

## Pulse Law (AI State Transparency)

Every AI action must expose state: Idle → Thinking → Success / Failure. Never allow a static control during processing.

## Responsive Intent Law

If intent is not clear at ~390px width without horizontal scroll, redesign.

## Actions & CTAs

- One **Primary** action only
- Secondary only if unavoidable
- Cancel / Discard = plain text Icons only if they reduce cognition. Copy actions never use buttons.

## Absolute Rule

If it feels:

- Clever → remove
- Powerful → simplify
- Complex → redesign Best design is invisible.