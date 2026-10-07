import fs from 'node:fs';
fs.rmSync('dist', {recursive:true,force:true});
fs.cpSync('out', 'dist', {recursive:true});
