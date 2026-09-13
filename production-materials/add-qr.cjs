const fs=require('fs');
const QRCode=require('qrcode');
(async()=>{
 await QRCode.toFile('public/workplace-qr.png','https://the-2026-workplace.ijchen.workers.dev/',{width:600,margin:4,errorCorrectionLevel:'M'});
 const p='app/CoursePage.tsx'; let s=fs.readFileSync(p,'utf8');
 const marker='</small></section></main>;return <main>';
 if(!s.includes(marker))throw Error('找不到首頁插入位置');
 s=s.replace(marker,'</small><div className="entry-qr"><a href="https://the-2026-workplace.ijchen.workers.dev/" aria-label="開啟 The 2026 Workplace"><img src="/workplace-qr.png" width="180" height="180" alt="掃描 QR Code 進入 The 2026 Workplace"/></a><div><strong>掃描進入課程</strong><p>使用手機相機掃描，開啟網站後輸入學號即可開始。</p><a href="/workplace-qr.png" download="The-2026-Workplace-QR-Code.png">下載 QR Code</a></div></div></section></main>;return <main>');
 fs.writeFileSync(p,s);
 fs.appendFileSync('app/globals.css','\n.entry-qr{display:flex;align-items:center;gap:20px;border-top:1px solid #143d3b33;margin-top:24px;padding-top:24px}.entry-qr img{display:block;width:160px;height:160px;max-width:none}.entry-qr strong{font-size:18px}.entry-qr p{font-size:14px;line-height:1.6;margin:8px 0}.entry-qr a{color:#143d3b;text-underline-offset:3px}@media(max-width:480px){.entry-qr{flex-direction:column;text-align:center}}\n');
})();
