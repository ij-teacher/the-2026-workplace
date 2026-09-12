import fs from 'node:fs';
import { build } from 'vite';
const root = '.pages-build';
fs.mkdirSync(root, {recursive:true});
const backend = 'https://the-2026-workplace.ijchen.workers.dev';
for (const [source, target] of [['app/CoursePage.tsx','CoursePage.tsx'],['app/teacher-export/page.tsx','TeacherExport.tsx']]) {
 let text = fs.readFileSync(source,'utf8');
 text = text.replaceAll('fetch("/api/', 'fetch("'+backend+'/api/');
 text = text.replaceAll('src="/the-2026-workplace.mp3"','src="/the-2026-workplace/the-2026-workplace.mp3"');
 text = text.replaceAll('src="/workplace-qr.png"','src={qr || undefined}');
 text = text.replaceAll('href="/workplace-qr.png"','href={qr || undefined}');
 text = text.replaceAll('href="https://the-2026-workplace.ijchen.workers.dev/"','href="/the-2026-workplace/"');
 text = text.replaceAll('href="/"','href="/the-2026-workplace/"');
 fs.writeFileSync(root+'/'+target,text);
}
fs.writeFileSync(root+'/main.tsx', `import React from 'react';import{createRoot}from'react-dom/client';import Course from './CoursePage';import TeacherExport from './TeacherExport';import '../app/globals.css';const teacher=location.pathname.endsWith('/teacher-export/');createRoot(document.getElementById('root')!).render(teacher?<TeacherExport/>:<><Course/><a href="/the-2026-workplace/teacher-export/" style={{position:'fixed',right:18,bottom:118,zIndex:110,background:'#143d3b',color:'white',padding:'11px 15px'}}>教師 Excel 匯出</a></>);`);
const html='<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>The 2026 Workplace</title><link rel="icon" href="/the-2026-workplace/favicon.svg"></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>';
fs.writeFileSync(root+'/index.html',html);
const result = await build({configFile:false,root,base:'/the-2026-workplace/',publicDir:'../public',esbuild:{jsx:'automatic'},build:{outDir:'../pages-dist',emptyOutDir:true}});
fs.mkdirSync('pages-dist/teacher-export',{recursive:true});
fs.copyFileSync('pages-dist/index.html','pages-dist/teacher-export/index.html');
fs.writeFileSync('pages-dist/.nojekyll','');
