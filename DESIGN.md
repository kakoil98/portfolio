---
name: Technical Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#424656'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#727687'
  outline-variant: '#c2c6d8'
  surface-tint: '#0054d6'
  primary: '#0050cb'
  on-primary: '#ffffff'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#006780'
  on-secondary: '#ffffff'
  secondary-container: '#76dcff'
  on-secondary-container: '#006077'
  tertiary: '#a33200'
  on-tertiary: '#ffffff'
  tertiary-container: '#cc4204'
  on-tertiary-container: '#fff6f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#6cd3f7'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e61'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832600'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-base:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  mono-base:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '450'
    lineHeight: '1.6'
    letterSpacing: '0'
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '450'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 20px
  container-max: 1280px
---

## Brand & Style

The design system is engineered for high-performance environments where clarity and technical rigor are paramount. It targets senior software engineers who value efficiency, legibility, and a "no-fluff" aesthetic. 

The visual style is **Minimalist-Technical**. It leverages generous whitespace to reduce cognitive load while employing high-precision details—such as hairline borders and monospaced accents—to signal a developer-centric focus. The emotional response is one of professional calm, reliability, and systemic order. It avoids trends like heavy shadows or vibrant gradients in favor of structural integrity and functional clarity.

## Colors

This design system utilizes a high-contrast light mode palette to ensure maximum readability for long coding or review sessions.

- **Primary Accent:** A sharp, technical blue used for primary actions, active states, and focus indicators.
- **Secondary Accent:** A deep cyan used sparingly for data visualization, success states, or distinct technical markers.
- **Neutrals:** A charcoal-to-white spectrum. Headlines use a deep charcoal (#111827) for authority, while secondary text uses a muted slate (#6B7280).
- **Surfaces:** Clean white for the main canvas, with very light gray (#F8F9FA) used for secondary containers, sidebars, and code blocks to create subtle hierarchy without shadows.

## Typography

The typography strategy pairs the utilitarian Swiss-style precision of **Inter** with the developer-native clarity of **JetBrains Mono**.

- **Inter** is the primary driver for the UI. Headlines should use semi-bold weights with tight letter spacing for a modern, compact look.
- **JetBrains Mono** is mandatory for all technical data, including code snippets, Git hashes, terminal outputs, and metadata labels. It should be used at slightly smaller sizes than body text to maintain visual balance.
- **Line Height:** Body text is set to 1.6 to ensure long-form technical documentation remains accessible and scannable.

## Layout & Spacing

The design system employs a **fixed grid** philosophy for desktop density and a fluid model for smaller viewports. 

- **The 4px Rhythm:** All spacing (padding, margins, component heights) must be increments of 4px.
- **Grid:** A 12-column grid with 20px gutters. Content is typically centered in a 1280px max-width container.
- **Whitespace:** Use "generous" vertical margins (xl/40px) between major sections to emphasize a minimalist, uncluttered environment.
- **Layout Model:** High-density information is organized into a modular sidebar/main-view structure, utilizing 1px borders to define regions rather than depth-based shadows.

## Elevation & Depth

This design system rejects deep, fuzzy shadows. Depth is conveyed through **Low-Contrast Outlines** and **Tonal Layers**.

- **Level 0 (Base):** Pure white (#FFFFFF) background.
- **Level 1 (Surfaces):** Very light gray (#F8F9FA) used for sidebars or card backgrounds to sit "behind" or "beside" primary content.
- **Level 2 (Interactive):** Elements that sit on top of the base layer are defined by a 1px solid border (#E5E7EB). 
- **Active State:** When an element is focused or active, the border color shifts to the Primary Technical Blue (#0066FF) or adds a subtle, crisp 2px offset border. 

Shadows are only permitted in a "minimalist-sharp" format: a single 1px or 2px direct-drop shadow with high transparency (10%) to indicate a floating menu or popover.

## Shapes

The shape language is "Soft" yet disciplined. While sharp corners are too aggressive for a modern SaaS, excessive rounding (pills) feels too consumer-focused.

- **Standard Radius:** 4px (0.25rem) for buttons, input fields, and small components. This provides a subtle "finished" look while maintaining a rigid, technical structure.
- **Large Radius:** 8px (0.5rem) for cards and main containers.
- **Interactive Elements:** Checkboxes and toggle tracks follow the 4px standard.

## Components

- **Buttons:** Primary buttons use a solid Technical Blue background with white Inter text. Secondary buttons are "ghost" style with a 1px border (#E5E7EB) and dark charcoal text.
- **Input Fields:** 1px gray borders that turn Primary Blue on focus. Labels use `mono-sm` to lean into the technical aesthetic.
- **Chips/Badges:** Small, rectangular with 2px radius. Use light blue backgrounds with Primary Blue text for status, or light gray for metadata.
- **Code Blocks:** Use the `surface-hex` background with `mono-base` text. Syntax highlighting should use a curated palette that complements the Technical Blue and Cyan.
- **Data Tables:** No vertical lines. Use horizontal 1px light gray dividers. Headers should be `label-caps` for a structured, dashboard feel.
- **Cards:** White background, 1px border (#E5E7EB), no shadow. Use for grouping related technical metrics or project summaries.