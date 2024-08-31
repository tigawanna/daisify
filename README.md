# Daisify

Convert your tailwind components to use DaisyUi themes 


usage 
run `daisify` 

Commands 

- daisify shadcn
  To convert your shadcn tailwind components to use daisyui themes
```sh
npx daisify shadcn
yarn daisify shadcn
pnpm dlx daisify shadcn
```



options 

```sh
Usage: daisify shadcn [options]

convert shadcn components to use daisyui themes

Options:
  -d, --dir <shadcn_directory>  shadcn components directory path
  -h, --help                    display help for command
```
It will try to infer the components directory from the ts config if it falis it will prompt you for one

the dafult is   `src/components/ui`   

```sh
npx daisify shadcn -d src/components/ui
```
Also remeber to later your `tailwind.config.js` and use 


```sh
 npm i daisify-shadcn tailwindcss-animate
 yarn add daisify-shadcn tailwindcss-animate
 pnpm add daisify-shadcn tailwindcss-animate
```

[daisify-shadcn tailwind plugin](https://github.com/tigawanna/daisify-shadcn)
