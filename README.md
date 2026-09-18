# richter-website

This site was built to be a professional portfolio and a personal home for projects. From sketching mockups to designing logos to styling pages, everything was done by me to look good on all devices and browsers.

**Live site:** [andrewtrichter.com](https://www.andrewtrichter.com/)

## Structure

| Folder | Description |
| --- | --- |
| [`svelte-app`](svelte-app) | **Current live site.** SvelteKit + Svelte 5 frontend, styled with Tailwind CSS. |
| [`sanity-cms`](sanity-cms) | Headless CMS (Sanity Studio) that powers content for `svelte-app`. |
| [`root`](root) | Previous static HTML/CSS/JS version of the site. **Legacy — scheduled for deletion.** Kept temporarily for reference only. |
| [`original_files`](original_files) | Original design and image source files (mockups, logos, photos) uploaded for safekeeping |

See each folder's own README for details on working in it.

## Cloning

`original_files/` is large (raw camera files, layered design files, etc.) and isn't needed to run the site. To clone without it for a much faster/smaller download:

```sh
git clone --filter=blob:none --sparse https://github.com/atrichter/richter-website.git
cd richter-website
git sparse-checkout set --no-cone '/*' '!/original_files'
```

If you need `original_files/` later, just run `git sparse-checkout disable` (or add it back with `git sparse-checkout set --no-cone '/*'`).

## Author

Andrew Richter

[linkedin.com/in/andrewtrichter](https://www.linkedin.com/in/andrewtrichter/)

<br/>
<br/>

<p align="right">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/mark-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset=".github/assets/mark-light.svg">
    <img src=".github/assets/mark-light.svg" alt="Andrew Richter mark" width="64" height="64">
  </picture>
</p>
