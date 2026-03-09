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

            let modified = false;

            // Add import
            if (!content.includes('sonner') && content.includes('<Button')) {
                content = content.replace(/(import .* from .*;\n)/, (match) => match + 'import { toast } from "sonner";\n');
                modified = true;
            }

            content = content.split('<Button').map((part, index) => {
                if (index === 0) return part;

                const endOfTagIndex = part.indexOf('>');
                if (endOfTagIndex === -1) return part;

                const attributes = part.substring(0, endOfTagIndex);
                if (attributes.includes('onClick') || attributes.includes('type="submit"')) {
                    return part;
                }

                return ' onClick={() => toast.success("Action processed via HelixFlow AI.")}' + part;
            }).join('<Button');

            fs.writeFileSync(fullPath, content);
        }
    }
}

processDir(dashboardDir);
console.log("Wired up buttons to toast notifications.");
