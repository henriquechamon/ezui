import fs from 'fs';
const configLines = fs.readFileSync('config.ezui', 'utf8').split('\n');

const config: any = {};
let title: string = 'My ezui Project'; 

configLines.forEach(line => {
  const [key, value] = line.split('=>').map(item => item.trim());
  if (key === 'title') {
    title = value || title; 
  }
  config[key] = value; 
});

const footer = `
  <footer style="
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    background-color: #000;
    color: #fff;
  ">
    2023 - ${title}
  </footer>
`;

export {
    footer
}