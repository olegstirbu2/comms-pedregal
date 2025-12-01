# Design Implementation Rules

## Overview
This document defines the rules for implementing UI designs in the Comms Panel application. These rules ensure pixel-perfect implementation and maintain design consistency across the application.

---

## 1. Design Fidelity (CRITICAL)

### Never Assume Designs
- **DO NOT** create or invent UI elements, layouts, or styling
- **DO NOT** use generic templates or boilerplate designs
- **ASK** if design specifications are unclear before proceeding
- **WAIT** for explicit design files, mockups, or detailed descriptions

### Use Styling from Figma
- Extract **ALL** styles directly from Figma (colors, typography, spacing, shadows, borders)
- Use Figma's Inspect panel for precise values
- Copy CSS properties verbatim when provided
- Maintain exact hex/RGB values - **DO NOT** approximate colors

### Stick to the Layout
- Implement the exact layout structure shown in designs
- Preserve grid systems, column counts, and breakpoints
- **DO NOT** rearrange elements for "better UX" without approval
- Match component hierarchy exactly as designed

---

## 2. Spacing & Alignment

### Respect Spacing, Outlines & Layout
- Use exact padding, margin, and gap values from Figma
- Maintain precise alignment (use Figma's spacing indicators)
- Preserve border-radius, stroke widths, and outline styles
- Pay attention to optical alignment adjustments (±1px tweaks)

### Optical Alignment
- Adjust by ±1px when perception beats geometry
- Balance icon/text lockups (stroke/weight/size/spacing/color)
- Deliberate alignment to grid/baseline/edges/optical centers
- No accidental placement

---

## 3. Assets & Icons

### Always Download Icons as SVG
- Extract icons as SVG from Figma (unless explicitly told otherwise)
- Preserve `viewBox`, `stroke-width`, and path data
- Maintain icon dimensions and styling properties
- Use inline SVG or optimize with SVGO when appropriate

### Images & Graphics
- Use exact dimensions from Figma
- Maintain aspect ratios
- Optimize for web (but preserve quality)
- Include alt text for accessibility

---

## 4. Validation & Testing

### Skip Extensive Validation
- **DO NOT** test or validate extensively (e.g., screenshot comparison with Figma)
- **DO NOT** use browser automation to test implementations — user tests manually
- Manual verification is sufficient for most cases
- Do critical validation only if needed
- Focus on implementation speed over perfection

### When to Validate
- Complex animations or interactions
- Cross-browser compatibility issues
- Accessibility concerns
- Performance-critical components

---

## 5. Figma Integration Workflow

### Standard Process
1. Request Figma link for new features
2. Use Figma Inspect panel for exact values
3. Download assets (icons as SVG, images optimized)
4. Extract design tokens (colors, spacing, typography)
5. Implement pixel-perfect
6. Iterate based on feedback if needed

### Design Token Extraction
- Colors: Copy exact hex values
- Spacing: Note all padding, margin, gap values
- Typography: Font family, size, weight, line-height, letter-spacing
- Shadows: Copy full shadow syntax
- Border radius: Exact px values

---

## 6. Tech Stack Considerations

### Tailwind CSS
- Use utility classes that match Figma values exactly
- Custom values in square brackets: `px-[24px]`, `text-[#191919]`
- Avoid approximations (e.g., use `px-[18px]` not `px-4.5`)

### Component Structure
- Match Figma layer hierarchy in JSX structure
- Use semantic HTML where possible
- Add comments referencing Figma layer names for complex components

### Responsive Design
- Implement mobile-first if specified
- Use exact breakpoints from design system
- Test at: mobile (375px), tablet (768px), desktop (1440px), ultra-wide (2560px)

---

## 7. Common Pitfalls to Avoid

❌ **Don't:**
- Round spacing values (12px → 10px)
- Approximate colors (#191919 → #1a1a1a)
- Change font weights without approval
- Add hover states not in design
- Modify border radius for "consistency"
- Reorganize component structure

✅ **Do:**
- Copy values exactly as shown
- Ask if something is unclear
- Document deviations with reasons
- Preserve Figma layer names in comments
- Use exact design tokens

---

## 8. Documentation

### Code Comments
- Reference Figma frame/layer names for complex sections
- Note any intentional deviations with reasoning
- Document dynamic values (e.g., "Height adjusts based on content")

### Component Documentation
- Props that affect visual appearance
- Variants available (from Figma)
- Usage examples
- Accessibility considerations

---

## Quick Reference

### Spacing Scale (Common)
`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `40px`, `64px`

### Border Radius (Common)
`4px`, `8px`, `16px`, `24px`, `100px` (pills)

### Font Sizes (Common)
`12px`, `14px`, `16px`, `18px`, `20px`, `24px`

### Shadows (Common)
- Light: `0px 1px 2px rgba(17,19,24,0.15)`
- Medium: `0px 1px 4px rgba(17,19,24,0.15)`
- Heavy: `0px 4px 12px rgba(17,19,24,0.15)`

---

**Last Updated:** December 2025  
**Applies to:** Comms Panel (Pedregal) Application