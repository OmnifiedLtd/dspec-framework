const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'website', 'docs');
const rootReadme = path.join(__dirname, 'README.md');
const sidebarsPath = path.join(__dirname, 'website', 'sidebars.js');
const outputFile = path.join(__dirname, 'llms-full.txt');

// 1. Read and parse sidebars.js
try {
    const sidebarsContent = fs.readFileSync(sidebarsPath, 'utf-8');
    
    // Extract the sidebars object by evaluating the code after stripping export default
    // usage of eval is generally discouraged but effective for this specific build-time utility
    // where we know the content structure.
    let evalCode = sidebarsContent.replace('export default sidebars;', '');
    evalCode = evalCode.replace('const sidebars =', 'sidebars =');
    
    const sidebars = (function() {
        let sidebars;
        eval(evalCode);
        return sidebars;
    })();

    // 2. Flatten the structure to get ordered IDs
    function getOrderedIds(items) {
        let result = [];
        if (!items) return result;
        
        items.forEach(item => {
            if (typeof item === 'string') {
                result.push(item);
            } else if (item.type === 'category' && item.items) {
                result = result.concat(getOrderedIds(item.items));
            } else if (typeof item === 'object' && item.id) {
                // Handle object style items if any (e.g. link or doc type)
                result.push(item.id);
            }
        });
        return result;
    }

    const ids = getOrderedIds(sidebars.tutorialSidebar);

    // 3. Map to files and concatenate
    const allDocs = fs.readdirSync(docsDir);
    let output = "";

    // Add Root README first
    if (fs.existsSync(rootReadme)) {
        console.log('Adding README.md...');
        output += `File: README.md\n`;
        output += fs.readFileSync(rootReadme, 'utf-8');
        output += `\n\n---\n\n`;
    }

    // Add ordered docs
    let foundCount = 0;
    let missingCount = 0;

    ids.forEach(id => {
        // Match logic: ID "foo" matches "foo.md", "foo.mdx", "01-foo.md", "01-foo.mdx"
        const match = allDocs.find(f => {
            const name = f.replace(/\.mdx?$/, '');
            if (name === id) return true;
            // Match numeric prefix format "XX-id" where XX is any number of digits
            if (name.match(new RegExp(`^\\d+-${id}$`))) return true;
            return false;
        });

        if (match) {
            const fullPath = path.join(docsDir, match);
            console.log(`Adding ${match}...`);
            output += `File: website/docs/${match}\n`;
            output += fs.readFileSync(fullPath, 'utf-8');
            output += `\n\n---\n\n`;
            foundCount++;
        } else {
            console.warn(`⚠️  Missing file for ID: ${id}`);
            missingCount++;
        }
    });

    fs.writeFileSync(outputFile, output);
    console.log(`\nSuccessfully generated ${outputFile}`);
    console.log(`Included ${foundCount} docs from sidebar.`);
    if (missingCount > 0) {
        console.log(`Failed to find ${missingCount} docs.`);
    }

} catch (err) {
    console.error('Error generating llms-full.txt:', err);
    process.exit(1);
}
