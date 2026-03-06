const fs = require('fs');

const processFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. UserProfile links
    if (filePath.includes('UserProfile')) {
        content = content.replace(
            /<button className="hidden sm:flex min-w-\[84px\] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-\[#f08a78\] hover:bg-\[#ee7a66\] text-white text-sm font-bold leading-normal tracking-\[0\.015em\] transition-all shadow-lg shadow-\[#f08a78\]\/25">[\s\S]*?<span className="truncate">Trở thành Host<\/span>[\s\S]*?<\/button>/,
            '<button onClick={() => navigate(\'/host/verification\')} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#f08a78] hover:bg-[#ee7a66] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#f08a78]/25"><span className="truncate">Trở thành Host</span></button>'
        );
    }

    if (filePath.includes('HostVerification')) {
        content = content.replace(
            /<button className="group relative w-full flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary hover:bg-primary-hover text-white text-lg font-bold py-4 px-8 transition-all shadow-lg shadow-primary\/30 hover:shadow-primary\/50 translate-y-0 hover:-translate-y-0\.5" type="button">/,
            '<button onClick={() => navigate(\'/host/verify-step2\')} className="group relative w-full flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#f08a78] hover:bg-[#ee7a66] text-white text-lg font-bold py-4 px-8 transition-all shadow-lg shadow-[#f08a78]/30 hover:shadow-[#f08a78]/50 translate-y-0 hover:-translate-y-0.5" type="button">'
        );
    }

    // Replace text colors
    content = content.replace(/text-slate-900/g, 'text-[#2B2B2B]');
    content = content.replace(/text-slate-400/g, 'text-[#d5ddc3]');
    content = content.replace(/text-slate-500/g, 'text-[#d5ddc3]');
    content = content.replace(/text-text-muted/g, 'text-[#d5ddc3]');
    
    // Replace primary hex #f08a78
    content = content.replace(/text-primary/g, 'text-[#f08a78]');
    content = content.replace(/bg-primary(\b)/g, 'bg-[#f08a78]$1');
    content = content.replace(/border-primary(\b)/g, 'border-[#f08a78]$1');
    content = content.replace(/shadow-primary/g, 'shadow-[#f08a78]');
    content = content.replace(/ring-primary/g, 'ring-[#f08a78]');
    content = content.replace(/fill-primary/g, 'fill-[#f08a78]');
    content = content.replace(/from-primary/g, 'from-[#f08a78]');
    content = content.replace(/to-primary/g, 'to-[#f08a78]');
    
    // Replace secondary #fbc4ae
    content = content.replace(/bg-primary-light/g, 'bg-[#fbc4ae]');
    content = content.replace(/text-teal-accent/g, 'text-[#fbc4ae]');
    content = content.replace(/bg-teal-accent/g, 'bg-[#fbc4ae]');
    content = content.replace(/border-teal-accent/g, 'border-[#fbc4ae]');

    fs.writeFileSync(filePath, content);
    console.log('Processed', filePath);
};

['src/pages/UserProfile/index.jsx', 'src/pages/HostVerification/index.jsx', 'src/pages/HostVerifyStep2/index.jsx'].forEach(processFile);
