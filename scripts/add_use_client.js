const fs = require('fs');
const path = require('path');

const dashboardDir = path.join(__dirname, '..', 'src', 'app', 'dashboard');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('page.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf-8');

            if (!content.includes('"use client"') && !content.includes("'use client'")) {
                content = '"use client";\n\n' + content;
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

processDir(dashboardDir);
console.log("Added 'use client' to all dashboard pages.");
