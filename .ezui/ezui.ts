import express from 'express';
import fs from 'fs';
import path from 'path';
import { Router } from './router/router';
import { Style } from './layout/layout';
import { NavBar } from './components/navbar';
import { footer } from './components/footer';
import { script } from './functions/functions';
import { Script } from 'vm';

const app = express();

interface Config {
    title?: string;
    description?: string;
    port?: string;
    logo?: string;
    bootstrap?: boolean;
    footer?: boolean;
    navbar?: boolean;
    [key: string]: string | boolean | undefined; // Index signature to allow dynamic keys
}

async function startServer() {
    fs.readFile('config.ezui', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error('', err);
            return;
        }
        const configLines: string[] = data.split('\n');
        const config: Config = {};
        configLines.forEach(line => {
            const [key, value] = line.split(':').map(item => item.trim());
            if (value === 'true') {
                config[key] = true;
            } else if (value === 'false') {
                config[key] = false;
            } else {
                config[key] = value;
            }
        });

        const ProjectName: string = config.title || "My ezui Project";
        const ProjectDescription: string = config.description || "This is my ezui Project";
        const port: number = parseInt(config.port || '3000', 10); // The default port is 3000
        const __dirname: string = path.resolve(); // Get the actual directory
        const Logo: string = config.logo || "https://cdn.discordapp.com/attachments/1217635173739397203/1257455888831217775/ez_ui.png?ex=6684788e&is=6683270e&hm=a553fc994f14632094a533d33ae5317b83a52b4a19a58095c7a869a4bd14a721&";
        let htmlData: { [key: string]: string } = {};

        fs.readdir('app', (err: NodeJS.ErrnoException | null, files: string[]) => {
            if (err) {
                console.error('Error while reading directory:', err);
            } else {
                const htmlFiles: string[] = files.filter(file => path.extname(file) === '.html');

                if (htmlFiles.length > 0) {
                    let mainPageFound: boolean = false;
                    htmlFiles.forEach((file, index) => {
                        fs.readFile(`app/${file}`, 'utf8', (err: NodeJS.ErrnoException | null, fileData: string) => {
                            if (err) {
                                console.error(`Error while reading HTML file: ${file}`, err);
                            } else {
                                const fileName: string = path.parse(file).name;
                                if (file === 'page.html') {
                                    htmlData['html1'] = fileData;
                                    console.log(`🌀✅ Main page successfully set: ${file}`);
                                    mainPageFound = true;
                                } else {
                                    htmlData[`html${index + 1}`] = fileData;
                                    console.log(`🌀✅ ${fileName} page is working in /${fileName}.`);
                                }
                                if (!mainPageFound && index === htmlFiles.length - 1) {
                                    console.error('Main page not found. Setting default.');
                                    const defaultMainPage: string = htmlFiles[0];
                                    fs.readFile(`app/${defaultMainPage}`, 'utf8', (err: NodeJS.ErrnoException | null, defaultData: string) => {
                                        if (err) {
                                            console.error(`Error while reading HTML ${defaultMainPage}`, err);
                                        } else {
                                            htmlData['html1'] = defaultData;
                                            console.log(`🌀 Main page successfully set as default: ${defaultMainPage}`);
                                        }
                                    });
                                }
                            }
                        });
                    });
                } else {
                    console.error('\n Error: \n ezui didn’t find any "page.html" archive in app.');

                    fs.readFile('.ezui/public/Apresentation.html', 'utf8', (err: NodeJS.ErrnoException | null, fileData: string) => {
                        if (err) {
                            console.error(`Error while reading HTML file: Apresentation.html`, err);
                        } else {
                            htmlData['html1'] = fileData;
                        }
                    });
                }
            }
        });

        app.use(express.static(path.join(__dirname, 'public')));

        app.get('/', (req: express.Request, res: express.Response) => {
            let headContent: string = `<meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="${Logo}" rel="icon">${Style}<script>${script}</script><script>${Router}</script>`;

            if (config.bootstrap) {
                headContent += `<title>${ProjectName}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`;
            } else {
                headContent += `<title>${ProjectName}</title>`;
            }

            if (config.footer) {
                headContent += `${footer}`;
            }
            if (config.navbar) {
                headContent += `${NavBar}`;
            }

            if (htmlData['html1']) {
                res.send(headContent + htmlData['html1']);
            } else if (htmlData['page.html']) {
                res.send(headContent + htmlData['page.html']);
            } else {
                res.send(headContent);
            }
        });

        app.get('/:filename', (req: express.Request, res: express.Response) => {
            const fileName: string = req.params.filename;

            if (fileName && fileName !== '' && fileName !== 'page.html') {
                const filePath: string = path.join(__dirname, 'app', `${fileName}.html`);

                fs.access(filePath, fs.constants.F_OK, (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                        console.error(`Error while reading HTML file: ${fileName}`, err);
                        res.status(404).send("Error while sending HTML to server: 404");
                    } else {
                        fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException | null, fileData: string) => {
                            if (err) {
                                console.error(`Error while reading HTML file: ${fileName}`, err);
                                res.status(500).send('Internal error');
                            } else {
                                let headContent: string = `<meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="${Logo}" rel="icon">${Style}<script>${Script}</script><script>${Router}</script>`;

                                if (config.bootstrap) {
                                    headContent += `<title>${ProjectName}</title>
                                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`;
                                } else {
                                    headContent += `<title>${ProjectName}</title>`;
                                }
                                if (config.footer) {
                                    headContent += `${footer}`;
                                }
                                if (config.navbar) {
                                    headContent += `${NavBar}`;
                                }
                                res.status(200).send(headContent + fileData);
                            }
                        });
                    }
                });
            } else {
                res.status(404).send('Endpoint não encontrado');
            }
        });

        app.listen(port, () => {
            console.log('ezui, the old Bolt framework @2024');
            console.log('');
            console.log(`Server started running on: \nhttp://localhost:${port}\nName: ${ProjectName}\nDescription: ${ProjectDescription}`);
        });
    });
}
startServer();