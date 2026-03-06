import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, 'src', 'pages');

const hostDirs = fs.readdirSync(pagesDir).filter(d => d.startsWith('Host'));

let fixedCount = 0;

for (const dir of hostDirs) {
    const filePath = path.join(pagesDir, dir, 'index.jsx');
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    let orig = content;

    // 1. All Logo links inside Host pages usually point to /home now. Change them to /host/dashboard
    // Logo is "Hands & Hour"
    content = content.replace(
        /(<Link[^>]*to=)"\/home"([^>]*>[\s\S]*?(?:Hands\s*&amp;\s*Hour|Cổng Người tổ chức)[\s\S]*?<\/Link>)/ig,
        '$1"/host/dashboard"$2'
    );
    content = content.replace(
        /(<Link[^>]*to=)'\/home'([^>]*>[\s\S]*?(?:Hands\s*&amp;\s*Hour|Cổng Người tổ chức)[\s\S]*?<\/Link>)/ig,
        '$1"/host/dashboard"$2'
    );

    // 2. Nav links in sidebar (usually containing text like "Bảng điều khiển", "Lịch", etc.)
    // Bảng điều khiển -> /host/dashboard
    content = content.replace(
        /(<Link[^>]*to=)["']\/home["']([^>]*>[\s\S]*?Bảng điều khiển[\s\S]*?<\/Link>)/g,
        '$1"/host/dashboard"$2'
    );
    // Lịch / Lịch trình -> /host/schedule
    content = content.replace(
        /(<Link[^>]*to=)["']\/home["']([^>]*>[\s\S]*?(?:Lịch trình|Lịch)[\s\S]*?<\/Link>)/g,
        '$1"/host/schedule"$2'
    );
    // Đánh giá -> /host/profile (since there's no evaluate page)
    content = content.replace(
        /(<Link[^>]*to=)["']\/home["']([^>]*>[\s\S]*?Đánh giá[\s\S]*?<\/Link>)/g,
        '$1"/host/profile"$2'
    );
    // Thu nhập -> /host/income
    content = content.replace(
        /(<Link[^>]*to=)["']\/home["']([^>]*>[\s\S]*?Thu nhập[\s\S]*?<\/Link>)/g,
        '$1"/host/income"$2'
    );
    // Workshop của tôi / Xưởng của tôi -> /host/workshops
    content = content.replace(
        /(<Link[^>]*to=)["']\/home["']([^>]*>[\s\S]*?(?:Workshop của tôi|Xưởng của tôi)[\s\S]*?<\/Link>)/g,
        '$1"/host/workshops"$2'
    );
    // Học viên -> /host/participants
    content = content.replace(
        /(<Link[^>]*to=)["']\/home["']([^>]*>[\s\S]*?Học viên[\s\S]*?<\/Link>)/g,
        '$1"/host/participants"$2'
    );
    // Hồ sơ / Cài đặt -> /host/profile
    content = content.replace(
        /(<Link[^>]*to=)["']\/home["']([^>]*>[\s\S]*?(?:Hồ sơ|Cài đặt)[\s\S]*?<\/Link>)/g,
        '$1"/host/profile"$2'
    );

    // Also replace any <a href="#"> with the equivalent Link using same logic, or button
    content = content.replace(
        /<button([^>]*)>([\s\S]*?Tạo Workshop[\s\S]*?)<\/button>/g,
        (m, attrs, inner) => {
            if (inner.includes('Tạo Workshop')) {
                return `<Link to="/host/create-workshop" ${attrs.trim().replace('w-full flex', 'w-full flex inline-block')}>${inner}</Link>`;
            }
            return m;
        }
    );

    if (orig !== content) {
        fs.writeFileSync(filePath, content, 'utf-8');
        fixedCount++;
        console.log('Fixed', dir);
    }
}

console.log('Done ' + fixedCount);
