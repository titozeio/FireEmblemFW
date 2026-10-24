import fs from 'fs';
const chars = JSON.parse(fs.readFileSync('data/characters.json', 'utf8')).characters;
const classes = JSON.parse(fs.readFileSync('data/classes.json', 'utf8')).classes;
fs.writeFileSync('supabase/characters-import.json', JSON.stringify(chars, null, 2));
fs.writeFileSync('supabase/classes-import.json', JSON.stringify(classes, null, 2));
console.log(chars.length, classes.length);
