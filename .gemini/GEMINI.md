# Gemini Memory & Rules

## Project-Specific Mandates

### Build Verification
- **ALWAYS** run `./test-build.sh` before committing changes to the `website/` or documentation.
- Do not push broken builds.

### Documentation Structure
- Documentation source: `website/docs/`
- Static assets (schemas, examples): `website/static/`
- Config: `website/docusaurus.config.js`

### Generate llms-full.txt
- After any changes to the documentation (e.g., `README.md` or `website/docs/` files), run `node generate_llms_full.js` from the project root to ensure `llms-full.txt` is up-to-date.

### Review llms.txt
- **Review `llms.txt`**: Before pushing, manually inspect `llms.txt` (the summary) to ensure it is up-to-date and valid, and check for any broken links.
