import fs from "fs";

const configLines = fs.readFileSync('config.ezui', 'utf8').split('\n');

const config:any = {};
let title: string = 'My ezui Project'; 
let image: string = 'https://cdn.discordapp.com/attachments/1217635173739397203/1257455888831217775/ez_ui.png?ex=6684788e&is=6683270e&hm=a553fc994f14632094a533d33ae5317b83a52b4a19a58095c7a869a4bd14a721&';

configLines.forEach(line => {
  const [key, value] = line.split('=>').map(item => item.trim());
  if (key === 'title') {
    title = value || title; 
  }
  config[key] = value; 
});

configLines.forEach(line => {
    const [key, value] = line.split('=>').map(item => item.trim());
    if (key === 'logo') {
      image = value || image; 
    }
    config[key] = value; 
  });

const NavBar = `
<nav style="
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
">
  <img src="${image}" alt="Logo" style="width: 30px; height: 30px; border-radius: 50%;">
  <div style="display: flex; align-items: center;">
    ${title}
  </div>
</nav>

`;

export {
    NavBar
}