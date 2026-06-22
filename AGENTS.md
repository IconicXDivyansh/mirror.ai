<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- CODEGRAPH_START -->

## CodeGraph

This project has a CodeGraph MCP server (`codegraph_*` tools) configured. CodeGraph is a tree-sitter-parsed knowledge graph of every symbol, edge, and file. Reads are sub-millisecond and return structural information grep cannot.

### When to prefer codegraph over native search

Use codegraph for **structural** questions — what calls what, what would break, where is X defined, what is X's signature. Use native grep/read only for **literal text** queries (string contents, comments, log messages) or after you already have a specific file open.

| Question                                                  | Tool                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| "Where is X defined?" / "Find symbol named X"             | `codegraph_search`                                                                   |
| "What calls function Y?"                                  | `codegraph_callers`                                                                  |
| "What does Y call?"                                       | `codegraph_callees`                                                                  |
| "How does X reach/become Y? / trace the flow from X to Y" | `codegraph_trace` (one call = the whole path, incl. callback/React/JSX dynamic hops) |
| "What would break if I changed Z?"                        | `codegraph_impact`                                                                   |
| "Show me Y's signature / source / docstring"              | `codegraph_node`                                                                     |
| "Give me focused context for a task/area"                 | `codegraph_context`                                                                  |
| "See several related symbols' source at once"             | `codegraph_explore`                                                                  |
| "What files exist under path/"                            | `codegraph_files`                                                                    |
| "Is the index healthy?"                                   | `codegraph_status`                                                                   |

### Rules of thumb

- **Answer directly — don't delegate exploration.** For "how does X work" / architecture questions, answer with 2-3 codegraph calls: `codegraph_context` first, then ONE `codegraph_explore` for the source of the symbols it surfaces. For a specific **flow** ("how does X reach Y") start with `codegraph_trace` from→to — one call returns the whole path with dynamic hops bridged — then ONE `codegraph_explore` for the bodies; don't rebuild the path with `codegraph_search` + `codegraph_callers`. Codegraph IS the pre-built index, so spawning a separate file-reading sub-task/agent — or running a grep + read loop — repeats work codegraph already did and costs more for the same answer.
- **Trust codegraph results.** They come from a full AST parse. Do NOT re-verify them with grep — that's slower, less accurate, and wastes context.
- **Don't grep first** when looking up a symbol by name. `codegraph_search` is faster and returns kind + location + signature in one call.
- **Don't chain `codegraph_search` + `codegraph_node`** when you just want context — `codegraph_context` is one call.
- **Don't loop `codegraph_node` over many symbols** — one `codegraph_explore` call returns several symbols' source grouped in a single capped call, while each separate node/Read call re-reads the whole context and costs far more.
- **Index lag**: the file watcher debounces ~500ms behind writes; don't re-query immediately after editing a file in the same turn.

### If `.codegraph/` doesn't exist

The MCP server returns "not initialized." Ask the user: _"I notice this project doesn't have CodeGraph initialized. Want me to run `codegraph init -i` to build the index?"_

<!-- CODEGRAPH_END -->

<!-- SKILL_RULES_START -->

## Skill Rules

Always load and follow the relevant skill before writing code in its domain.

**When loading a skill, explicitly state it in your response so the user knows which guidelines are being followed.** Format: `Loading \`skill-name\` — <brief reason>.`

### React code

Load the **vercel-react-best-practices** skill (`@.agents/skills/vercel-react-best-practices/SKILL.md`) when writing any React component, hook, or client-side logic. Follow its patterns for composition, state management, and performance.

### Component architecture & composition

Load the **vercel-composition-patterns** skill (`@.agents/skills/vercel-composition-patterns/SKILL.md`) when building reusable component libraries, refactoring components with boolean prop proliferation, or designing compound component APIs.

### shadcn components

Load the **shadcn** skill (`@.agents/skills/shadcn/SKILL.md`) when creating or modifying shadcn/ui components. Follow its conventions for styling, variants, and composition.

### Supabase

Load the **supabase** skill (`@.agents/skills/supabase/SKILL.md`) for any Supabase task. Load **supabase-postgres-best-practices** (`@.agents/skills/supabase-postgres-best-practices/SKILL.md`) for Postgres schema/query work.

### Drizzle ORM

Load **drizzle-best-practices** (`@.agents/skills/tessl__drizzle-best-practices/SKILL.md`) when writing or reviewing Drizzle ORM code — covers schema definition, type-safe queries, relations, migrations, transactions, upserts, and connection setup.

### Next.js API patterns

Load **nextjs-api-patterns** (`@.agents/skills/tessl__nextjs-api-patterns/SKILL.md`) when building Route Handlers, Server Actions, middleware, error boundaries, or any API layer in Next.js App Router.

### General UI

Load **web-design-guidelines** (`@.agents/skills/web-design-guidelines/SKILL.md`) for general design and layout decisions.

### Landing pages & frontend design

Load **design-taste-frontend** (`@.agents/skills/design-taste-frontend/SKILL.md`) when building landing pages, portfolios, or redesigns. Covers anti-slop design discipline, typography, color calibration, layout rules, animation strategy, and AI tell avoidance.

### UI polish & animation

Load **emil-design-eng** (`@.agents/skills/emil-design-eng/SKILL.md`) when polishing UI interactions, building animations, or reviewing component design. Covers animation decision framework, spring physics, easing curves, component principles (button feedback, popover origins, tooltip delays), and performance rules.

### Next.js

Load the **next-best-practices** skill (`@.agents/skills/next-best-practices/SKILL.md`) when writing or reviewing any Next.js code — covers file conventions, RSC boundaries, async patterns, error handling, data patterns, metadata, images, fonts, bundling, and more.

### Next.js caching & PPR

Load the **next-cache-components** skill (`@.agents/skills/next-cache-components/SKILL.md`) when working with `use cache`, `cacheLife`, `cacheTag`, `updateTag`, or Partial Prerendering (PPR).

### Architecture review

Load **improve-codebase-architecture** (`@.agents/skills/improve-codebase-architecture/SKILL.md`) when the user asks to review or improve codebase architecture.

### Module design

Load **codebase-design** (`@.agents/skills/codebase-design/SKILL.md`) when designing or refactoring module interfaces, finding deepening opportunities, or working with seams and testability. Provides shared vocabulary (module, interface, depth, seam, adapter, leverage, locality).

### Systematic debugging

Load **systematic-debugging** (`@.agents/skills/tessl__systematic-debugging/SKILL.md`) when encountering any bug, test failure, or unexpected behavior. Four-phase framework: root cause investigation → pattern analysis → hypothesis testing → implementation. Always find root cause before proposing fixes.

### Performance optimization

Load **performance-optimization** (`@.agents/skills/performance-optimization/SKILL.md`) when optimizing load times, fixing Core Web Vitals, reducing bundle size, or profiling bottlenecks. Covers the measure → identify → fix → verify → guard workflow.

### UI/UX best practices

Load **userinterface-wiki** (`@.agents/skills/userinterface-wiki/SKILL.md`) when reviewing animations, CSS, typography, UX patterns, or icon implementations. Covers 12 categories from animation principles to visual design.

### Interface polish

Load **make-interfaces-feel-better** (`@.agents/skills/make-interfaces-feel-better/SKILL.md`) when building or reviewing UI components — covers concentric border radius, optical alignment, shadows, enter/exit animations, font smoothing, tabular numbers, and scale on press.

### Design iteration

Load **impeccable** (`@.agents/skills/impeccable/SKILL.md`) for comprehensive design work — critiquing, polishing, animating, or reshaping frontend interfaces. Covers UX review, visual hierarchy, accessibility, responsive behavior, and anti-pattern avoidance.

<!-- SKILL_RULES_END -->
