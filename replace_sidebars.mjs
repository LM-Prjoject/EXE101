import fs from 'fs';
import path from 'path';

const pages = [
    'HostDashboard',
    'HostMyWorkshops',
    'HostScheduleManagement',
    'HostInstructorProfile',
    'HostIncomeOverview'
];

pages.forEach(page => {
    const p = path.join('src/pages', page, 'index.jsx');
    if (fs.existsSync(p)) {
        let text = fs.readFileSync(p, 'utf8');

        // add import if not exists
        if (!text.includes('HostSidebar')) {
            text = text.replace(/import { useNavigate, Link } from 'react-router-dom';/,
                "import { useNavigate, Link } from 'react-router-dom';\nimport HostSidebar from '../../components/HostSidebar';");
        }

        // Replace the `<aside>` block
        text = text.replace(/<aside[^>]*>[\s\S]*?<\/aside>/i, '<HostSidebar />');

        // Replace the `<nav>` block that acts as a sidebar
        text = text.replace(/<nav className="w-64[^>]*>[\s\S]*?<\/nav>/i, '<HostSidebar />');

        fs.writeFileSync(p, text, 'utf8');
        console.log(`Replaced sidebar in ${page}`);
    }
});
