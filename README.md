
# ezui 🌀
![Logo](https://media.discordapp.net/attachments/1115642915327316102/1285404187127058494/ez_ui_1.png?ex=66ea256f&is=66e8d3ef&hm=d021accb19a6070fe5d3881305554fc0a75ba15c10213c46f458c86528422f76&=&format=webp&quality=lossless)

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
