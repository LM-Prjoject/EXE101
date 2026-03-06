import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, 'src', 'pages');

const dirs = fs.readdirSync(pagesDir).filter(d => true); // Check all pages just in case

let count = 0;
for (const dir of dirs) {
    const p = path.join(pagesDir, dir, 'index.jsx');
    if (fs.existsSync(p)) {
        let text = fs.readFileSync(p, 'utf8');

        // Replace Xưởng -> Workshop
        // Replace xưởng -> workshop
        const newText = text
            .replace(/Xưởng/g, 'Workshop')
            .replace(/xưởng/g, 'workshop');

        if (newText !== text) {
            fs.writeFileSync(p, newText, 'utf8');
            count++;
        }
    }
}
console.log(`Replaced in ${count} files.`);
