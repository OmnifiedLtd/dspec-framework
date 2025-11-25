# Agent Guidelines

This file contains critical instructions and context for AI agents working on this repository.

## Development Workflow

### 1. Verify Builds Locally
**CRITICAL:** Before committing ANY changes to the repository, you MUST run the build test script to ensure the site compiles correctly and there are no major errors (like broken links).

```bash
./test-build.sh
```

If the build fails, **DO NOT COMMIT**. Fix the errors first.

### 2. Documentation
- All documentation is located in `website/docs/`.
- Schema files are in `website/static/schemas/`.
- Use `pathname:///` for linking to static files (like schemas) to avoid Docusaurus resolving them as pages.

### 3. Docusaurus
- The website is built with Docusaurus using a custom Tailwind + Shadcn theme.
- Configuration is in `website/docusaurus.config.js`.
- Sidebars are defined in `website/sidebars.js`.

### 4. Generate llms-full.txt
- After any changes to the documentation (e.g., `README.md` or `website/docs/` files), run `node generate_llms_full.js` from the project root to ensure `llms-full.txt` is up-to-date.

### 5. Review llms.txt
- **Review `llms.txt`**: Before pushing, manually inspect `llms.txt` (the summary) to ensure it is up-to-date and valid, and check for any broken links.
