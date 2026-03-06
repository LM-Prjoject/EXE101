import fs from 'fs';
import path from 'path';

const pages = [
    'HostDashboard',
    'HostScheduleManagement',
    'HostInstructorProfile',
    'HostIncomeOverview'
];

pages.forEach(page => {
    const p = path.join('src/pages', page, 'index.jsx');
    if (fs.existsSync(p)) {
        let text = fs.readFileSync(p, 'utf8');

        // add import if not exists
        if (!text.includes('HostHeader')) {
            text = text.replace(/import { useNavigate, Link } from 'react-router-dom';/,
                "import { useNavigate, Link } from 'react-router-dom';\nimport HostHeader from '../../components/HostHeader';");
        }

        let title = 'Bảng điều khiển';
        if (page === 'HostScheduleManagement') title = 'Quản lý Lịch trình';
        if (page === 'HostInstructorProfile') title = 'Hồ sơ Giảng viên';
        if (page === 'HostIncomeOverview') title = 'Quản lý Thu nhập';

        // special replacement for HostIncomeOverview to extract the button
        if (page === 'HostIncomeOverview') {
            text = text.replace(
                /<header[^>]*>[\s\S]*?(<button[^>]*>[\s\S]*?Xuất dữ liệu\s*<\/button>)[\s\S]*?<\/header>/i,
                `<HostHeader title="${title}">\n          $1\n        </HostHeader>`
            );
        } else {
            text = text.replace(
                /<header[^>]*>[\s\S]*?<\/header>/i,
                `<HostHeader title="${title}" />`
            );
        }

        fs.writeFileSync(p, text, 'utf8');
        console.log(`Replaced header in ${page}`);
    }
});
