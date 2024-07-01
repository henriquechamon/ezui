
# ezui 🌀
![Logo](https://cdn.discordapp.com/attachments/1217635173739397203/1257455888831217775/ez_ui.png?ex=6684788e&is=6683270e&hm=a553fc994f14632094a533d33ae5317b83a52b4a19a58095c7a869a4bd14a721&)

ezui, is the new version of bolt-js, now wrote in TypeScript.




## New updates

Now your codes are saved auto while you code into ezui, don't need an restart.



## Functions

- Routes using HTML
- AutoSave
- Change title, description and frameworks of all your project in config.ezui


## Get started

Install ezui using git

```bash
  git clone https://github.com/henriquechamon/ezui
  cd ezui
```

Now, install the dependencies 

```bash
 npm i express path fs
```

Configure your "config.ezui" archive in main route

```bash
  // ezui

ezui.config {
 title: My ezui project
 description: ezui project
 logo: https://mylogo.ezui
}
ezui.server {
 port: 3000
}
ezui.layout {
 navbar: false
 footer: false
 bootstrap: false
}
```
Done! Now you can create your pages in "app" directory and use ezui.
