import fs from 'fs';
function toCsv(rows){
  if(!rows.length) return '';
  const keys = Object.keys(rows[0]);
  const esc = v => {
    if(v===null||v===undefined) return '';
    const s = String(v);
    if(s.includes(',')||s.includes('"')||s.includes('\n')) return '"'+s.replace(/"/g,'""')+'"';
    return s;
  };
  return [keys.join(','), ...rows.map(r=>keys.map(k=>esc(r[k])).join(','))].join('\n');
}
const chars = JSON.parse(fs.readFileSync('supabase/characters-import.json','utf8'));
const classes = JSON.parse(fs.readFileSync('supabase/classes-import.json','utf8'));
fs.writeFileSync('supabase/characters-import.csv', toCsv(chars));
fs.writeFileSync('supabase/classes-import.csv', toCsv(classes));
console.log('ok');
