# IHEP FTS Workshop Report Design System

## 0. Research Log

- Approved brief: Scholarly migration, content-first conference layout, one dominant visual with a few points, no CERN identity or external imagery.
- JUNO map update: use Natural Earth coastline geometry and the user's logical transfer links, with approximate regional site positions. The SVG is editable, embeds its fonts, and is not a generated measurement plot.
- Installed-theme inspection: Scholarly 1.4.1 `cover`, `default`, `two-cols`, `bullets`, and native `ScholarlyHeader`/`ScholarlyFooter` APIs were read before authoring.
- Skipped external research and imagery: the report is a supplied-facts restyle and the brief forbids new FTS research, remote assets, and generated figures.

## 1. Atmosphere & Identity

For colleague-facing revisions, use plain descriptions such as `Not Tested In DC24` instead of abstract `coverage gaps`. Make alternative requests explicitly OR. Distinguish normal-traffic multipliers from extreme-load multipliers, and selected peak-test windows from continuous maximum-load duration. Storage totals must use latest per-site used space, carry an as-of date, and state that replicas are included; they are not unique dataset sizes or cumulative FTS transfer volumes.

The FTS4 Test Bed and Summary pages are now filled from reviewed, bounded evidence. Never expose test-machine hostnames or credentials in the slides. Small-file VOMS/JWT successes are functional checks, not performance or production-readiness claims; unmanaged-token success does not establish managed-token lifecycle support.

The cover uses explicit flex centering in both web and actual export mode, rather than relying on grid auto margins. All authors share one affiliation shown below the complete author list. Validate cover position in a real export-mode server as well as the web preview; text-presence checks alone do not detect a top-aligned cover.

Order diagnostic service lists from application/workflow and management layers down through middleware to database, storage and compute infrastructure. Emphasize FTS3 in its natural position using bold and the standard blue, not by moving it to the beginning.

Each Outline major section gets a native Scholarly `section` divider immediately before its first content page. Use a centered 36px blue section title on white with the standard conference/page footer. Add dividers for Data Challenge Plans and FTS4 Status when their content is authored; do not create empty chapters. Normal content remains 18px. The AI overview uses a four-stage human-reviewed cycle, explicitly listing cross-system context and bolding FTS3; knowledge reuse is not autonomous repair or model retraining.

Center every authored table/figure caption above its own table or figure, never left-align it. For paired plots, center the shared caption over the plot column; the adjacent table has its own centered caption. Keep Title Case and the common 14px caption size.

Captions are short, plain-language labels for a spoken workshop report, not paper-style methodological descriptions. Capitalize Every Word, preserve acronyms, and place figure titles above the image: `JUNO Data Flow`, `HERD Data Flow`, `FTS Transfer Status At IHEP This Year`. Table captions identify scope, such as `JUNO Transfers This Year`; reserve `All Recorded` for queries without a time filter. Put line-style legends below the image. Keep detailed dates, units, scope, limitations and attribution in speaker notes and source files instead of projected footnotes. Retain meaningful diagram labels and current/planned distinctions.

All V2 slides, including the cover and future slides, have a two-part footer: conference/date/location and the page count only. No left-hand report/author label or footer navigation buttons. The deck-wide `htmlAttrs.data-fts-deck: v2` scopes this behavior without changing the old deck; keyboard navigation remains available. JUNO and HERD figure bodies use the same light 1px `#d5dee7` frame, excluding the top title and bottom legend.

This is a quiet, evidence-led workshop report for FTS operators and experiment stakeholders. The field is white paper, the text is black, and a single deep blue carries the Scholarly chrome and structural emphasis. The signature is the evidence frame: one readable flow, matrix, or comparison owns most of the slide while a short list states only the decision-relevant points.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Canvas | `--c-canvas` | `#FFFFFF` | Projected slide field |
| Surface | `--c-surface` | `#FFFFFF` | Structural diagram nodes and table body |
| Surface quiet | `--c-surface-quiet` | `#F7F9FC` | Minimal grouping inside a visual only |
| Ink | `--c-ink` | `#111111` | Headings and body copy |
| Ink muted | `--c-ink-muted` | `#4B5563` | Captions, qualifiers, and source notes |
| Rule | `--c-rule` | `#CBD5E1` | Table and diagram separators |
| Blue | `--c-blue` | `#1E3A5F` | Scholarly header/footer, title rule, flow emphasis |
| Blue light | `--c-blue-light` | `#DCE7F2` | Optional structural fill, never a content card |

### Rules

- `classic-blue` is the Scholarly palette; authored chrome is solid `--c-blue` so blue is the only accent.
- Content stays light and white. No authored gradients, shadows, decorative photos, remote image dependencies, colored cards, or invented data plots. Slide 3 may use the user-requested FTS/JUNO/HERD/CEPC project marks, stored locally and displayed without stretching; attribution is in `public/logos/SOURCES.md`.
- Status words such as `INPUT`, `TO CONFIRM`, `DECIDE`, and `PROPOSED` remain explicit text and are not encoded by color alone.
- All authored CSS colors use these tokens. Scholarly internals retain ownership of native navigation controls.
- The geographic map uses blue for bidirectional FTS links and brown-orange for the one-way raw-data ingress, with a legend. These colours distinguish transfer roles, not measured traffic volume.
- The JUNO map can be opened as a full-size SVG in a separate tab. Projector/desktop viewing is the reading baseline; narrow slide previews keep fixed 16:9 scaling and use the full-size map for inspecting labels rather than reflowing the slide.
- The 2026 operations page uses authentic, locally captured Grafana panels with read-only query overrides. Preserve their axes and native styling; screenshots are evidence, not replacements for the slide's DOM table or text. Both plots use UTC daily bins and the same completion-time range as the table.
- HERD uses an editable Earth-limb/space-station SVG with restrained blue sky/Earth shading. This is an illustrative exception to flat diagrams, not a generated photograph or official station logo. Solid CERN→IHEP means current Beam Test Data; dashed station→IHEP means planned raw-data arrival. 2029 labels planned HERD deployment, not launch of the space station.

## 3. Typography

### Scale

| Level | Size | Weight | Line height | Usage |
|-------|-------|--------|-------------|-------|
| Cover display | `48px` | 700 | 1.08 | Native Scholarly cover title |
| Section display | `--type-section` / `36px` | 700 | 1.2 | Section dividers and the Summary closing acknowledgement |
| Native title | `24px` | 700 | 1.15 | Scholarly header within its 50px chrome |
| Lead | `24px` | 400 | 1.25 | A slide claim or visual introduction |
| Body | `22px` | 400 | 1.35 | Ordinary lists and diagram labels |
| Table | `18px` | 400 | 1.3 | Dense matrices and backup evidence |
| Source | `14px` | 400 | 1.25 | Citations and provenance |
| Code | `16px` | 400 | 1.25 | Commands and field names only |

### Font Stack

- Primary: bundled `Arimo` 400/700, then `Noto Sans CJK SC`, `DejaVu Sans`, `Arial`, sans-serif.
- Code: system monospace only for commands, identifiers, and arithmetic.
- Scholarly `--scholarly-font-sans`, `--scholarly-font-body`, and `--scholarly-font-serif` are overridden under `:root[data-font-theme]`; changing only Slidev's `fonts.sans` is insufficient.
- `fonts.provider` remains `none`; only the local `@fontsource/arimo/latin-400.css` and `latin-700.css` imports are used.

### Rules

- All V2 content pages use exactly 18px/1.3 Arimo for introductions, bullet text, links and table cells. No per-page auto-sizing or compact-body exceptions. Section headings use 24px; source/period notes and captions use 14px/1.25. Cover and native header/footer sizes remain separate and unchanged.
- `deck-v2` scopes the fixed typography and layout to the new draft, without changing the old deck. The root reserves header/footer space once (74px top, 56px bottom, 56px sides); inner wrappers have no duplicate chrome padding. Keep real overflow detection active rather than hiding scrollbars or clipping content. JUNO/HERD diagram pages share a 3:2 split and 24px gap.
- No light weights, all-caps labels, expanded tracking, Montserrat, Roboto Mono, or serif body text.
- One visible native title per content slide. The body supplies the visual and does not repeat the authored header.

## 4. Spacing & Layout

### Base Unit

All authored spacing derives from a 4px base.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Tight inline separation |
| `--space-2` | `8px` | Compact list and table gaps |
| `--space-3` | `12px` | Visual labels and caption gaps |
| `--space-4` | `16px` | Standard inner spacing |
| `--space-6` | `24px` | Main visual and points gap |
| `--space-8` | `32px` | Section separation |
| `--space-10` | `40px` | Cover breathing room |
| `--space-16` | `64px` | Safe horizontal margin |
| `--stroke` | `1px` | Table and diagram rules |
| `--stroke-strong` | `2px` | Main visual and title rules |

### Grid

- Reference canvas is `980 x 551`, fixed `16:9`; Scholarly reserves a 50px header and 36px footer.
- The native footer is explicitly anchored to the slide bottom with authored CSS, so PDF export does not depend on generated utility inset classes.
- Two-column footers reset `grid-column` to `auto`: retaining grid-track placement on an absolute footer causes Chrome PDF pagination to omit it on non-final pages.
- Main content uses a `2fr 1fr` visual-to-points split, or a full-width evidence table when the table is the visual.
- Visuals occupy roughly two-thirds of the available body. A slide may use a full-width flow or matrix when the evidence itself needs the width.
- Pipeline nodes use a 140px minimum height and 16px arrow gap. RCA outputs use a two-by-two grid so long labels stay intact; this grid represents the four report sections, not measured quantities.
- Alternative injector modes have no connecting arrows. PDF delivery uses native per-slide export and page-local text checks, rather than treating a successful bulk export as proof of complete content.
- Slidev scales the fixed canvas. No viewport breakpoints stack or recompose slide content.
- Native `default` and `two-cols` layouts own their content wrappers and overflow behavior; authored visual frames use `min-width: 0` and `min-height: 0`.

## 5. Components

### Scholarly Chrome

- **Structure**: native `cover`, `ScholarlyHeader`, and `ScholarlyFooter` supplied by the theme layout.
- **Variants**: cover, content, backup, discussion.
- **Spacing**: theme-owned 50px header and 36px footer; authored content does not duplicate either.
- **States**: static presentation, native navigation controls, visible focus in interactive mode.
- **Accessibility**: title text remains a heading; footer page number and controls remain theme-owned.
- **Motion**: no authored motion; retain only native navigation behavior.
- **Layout**: fixed slide shell; native chrome is outside the authored visual frame.

### Visual Frame

- Dashboard introductions use one authentic screenshot on the left and short explanatory points on the right. Center its caption and link to the full-size image; crop complete relevant panels rather than recomposing a mock dashboard. Explain ingestion mechanisms on the architecture page and their filtering effect on the dashboard page. Distinguish panels outside a captured section explicitly.

- Monitoring stages may pair a locally stored project logo (or a code-bracket icon for in-house MonPipe) with the component name and role. Use a consistent 36px icon box with preserved aspect ratio; source attribution stays in `public/logos/SOURCES.md`.

- Monitoring architecture may use a two-column page with a vertical five-stage event/data flow. Use 18px stage names, 14px role/ownership labels, a centered caption, and the shared light frame. Label public/shared services explicitly instead of enclosing them in a DCI container group; future consumers remain clearly aspirational in adjacent text.

- **Structure**: semantic `figure` or `section` containing one dominant flow, comparison, or evidence table, plus a caption.
- **Variants**: flow, lifecycle, comparison, matrix, inventory.
- **Spacing**: `--space-3` labels, `--space-4` internal gaps, `--space-6` composition gap.
- **States**: conceptual, proposed, reported, to confirm; state is written in text.
- **Accessibility**: use `figure`/`figcaption`, semantic headings, and readable text labels; SVG-only meaning is not allowed.
- **Motion**: static.
- **Layout**: intrinsic grid/flex visual with no scroll owner.

### Plain Points

- Operational issue pages use a short introduction, a 24px issue heading, full-width labeled 18px points, and an 18px related follow-up separated by a thin rule. Keep workarounds, proposed FTS features, and client-side bugs distinct; sources and detailed incident context stay in speaker notes.

- **Structure**: ordinary unordered list beside the visual.
- **Variants**: explanation, boundary, decision, question, takeaway.
- **Spacing**: `--space-2` between points and `--space-6` outer composition gap.
- **States**: static; uncertainty is written as `INPUT`, `DECIDE`, or `PROPOSED`.
- **Accessibility**: native disk bullets, no color-only meaning, no decorative icons.
- **Motion**: static.
- **Layout**: reading column beside or below a visual.

### Evidence Table

- Incident examples may use a qualitative symptom → AI clue → human verification → fix table when exact matching timings are unavailable. Keep inferred problem scope distinct from a human-confirmed root cause; never borrow numeric timings from a different incident or present expected future speedups as measured results.

- **Structure**: semantic `table` with `caption`, `thead`, and `tbody`.
- **Variants**: readiness, inventory, metrics, provenance, backup detail.
- **Spacing**: `--space-2` cell padding and `--space-3` row rhythm.
- **States**: confirmed, reported, proposed, to confirm; status text is explicit.
- **Accessibility**: concise headers and no merged cells that obscure reading order.
- **Motion**: static.
- **Layout**: full-width visual frame; table text may use the 18px table token.

## 6. Motion & Interaction

- The deck adds no transitions, reveals, hover effects, or automatic motion. `transition: null` remains the default.
- Native Scholarly navigation and focus states remain available in the player; authored content has no interactive controls.
- Reduced motion is respected by retaining a static authored surface.

## 7. Depth & Surface

### Strategy

Use **borders-only** for authored content. White is the field and surface; one-pixel rules establish reading structure, while a two-pixel blue rule marks the main visual. No authored shadow, gradient, radius, glass, or card stack is permitted.

| Surface | Token | Use |
|---------|-------|-----|
| White | `--c-canvas` | Slide field and visual surface |
| Quiet blue-white | `--c-surface-quiet` | Structural grouping inside a visual |
| Rule | `--c-rule` | Table and flow separators |
| Scholarly blue | `--c-blue` | Native chrome and structural emphasis |

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA target: 4.5:1 for normal text and 3:1 for large text.
- Every figure includes a visible caption or adjacent boundary sentence; proposed and unmeasured states are written in text.
- Use semantic headings, lists, tables, figures, captions, and links. Do not communicate meaning with tint or color alone.
- Preserve readable 16:9 scaling at the requested 1280, 768, and 375 width QA surfaces; no authored horizontal scroll.
- Presenter notes may contain Chinese and remain in HTML comments for the speaker; they are not projected content.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|------|----------|--------------|--------------|
| Presenter identity and approved affiliation remain `I01` | Cover / Backup I | The brief forbids inventing identity or logos | IHEP presenter before rehearsal |
| Exact release, nodes/HA, workflow, public metrics, incidents, and FTS4 results remain inputs | Slides 2–9, 14, 27 | The supplied evidence supports boundaries, not missing site facts | Service and experiment owners |
| Historical injector campaign evidence and sanitized RCA remain open | Slides 10, 22–23, 27 | No date, curve, or incident result may be fabricated | FTS/DCI owners |
| DC27 routes, storage inventory, bandwidth history, and gate ownership remain proposed | Slides 11–16, 24–25, 27 | Candidate values are preserved as discussion inputs, not commitments | Network, storage, FTS, and experiment owners |
