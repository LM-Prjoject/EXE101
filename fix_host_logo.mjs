import fs from 'fs';
import path from 'path';

const dirs = fs.readdirSync('src/pages').filter(d => d.startsWith('Host'));

let c = 0;
for (const dir of dirs) {
    const p = path.join('src/pages', dir, 'index.jsx');
    if (fs.existsSync(p)) {
        let text = fs.readFileSync(p, 'utf8');

        // Most host pages have branding with a div containing the icon, before the text Hands & Hour
        text = text.replace(
            /<div[^>]*>\s*<span[^>]*>[a-z_]+<\/span>\s*<\/div>\s*<div[^>]*>\s*<h[1-2][^>]*>Hands\s*&amp;\s*Hour<\/h[1-2]>/gi,
            `<div>
      <img src="/logo.png" alt="Hands & Hour Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
      </div>
      <div className="flex flex-col">
      <h1 className="text-text-main text-lg font-bold leading-tight">Hands &amp; Hour</h1>`
        );

        // HostCreateWorkshop and others have:
        text = text.replace(
            /<div[^>]*>\s*<span[^>]*>[a-z_]+<\/span>\s*<\/div>\s*<h[1-2][^>]*>Hands\s*&amp;\s*Hour<\/h[1-2]>/gi,
            `<div>
      <img src="/logo.png" alt="Hands & Hour Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
      </div>
      <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Hands &amp; Hour</h2>`
        );

        if (text !== fs.readFileSync(p, 'utf8')) {
            fs.writeFileSync(p, text, 'utf8');
            c++;
        }
    }
}
console.log('Fixed:', c);
