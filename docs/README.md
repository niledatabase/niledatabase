# Docs for niledatabase

Take a look [developers](../../DEVELOPERS.md) to run this app locally

## Adding a page to the documentation

1. Add a folder under `guides/[[...slug]]` with the desired url.
   > if you want `/guides/getting-started` as your path, add a folder `/getting-started`
2. add an `<slug-name>.mdx` file, put either markdown or react in it

## Adding to the side navigation

The side navigation will automatically render files, based on their location and format.

A `meta` object should be exported to control how the side navigation renders. If no meta is provided, the 1st `#` will be used as the title. If both of these are missing, the file will not show up in the side navigation.

```typescript
export const meta = {
  title: "Learn Nile with SQL", // the title that will show on the side navigation
  order: 1, // the order in the subnav, based on the subdirectory the file is located
};
```

## Styling options

[Tailwind.css](https://tailwindcss.com/) is used for adding styles.

## Index components

A common design pattern is to have a grid of options on an index page. To accomplish this, add `<Card />` and `<Cards />` to your markdown files. A `file` is expected (as the relative path based on `guides/[[...slug]]`). This will grab the `title` and `description` from the `meta`

```typescript
<Cards>
  <Card file="./getting-started/index.mdx" />
  <Card file="./getting-started/sql.mdx" />
</Cards>
```
