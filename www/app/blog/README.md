# Blog

## First time blogger?

Add an entry to `./authors.ts` following the conventions in the file.
Add an image in `/public/authors/[key].png`

## Create a blog post

Aded a new file to this directory with a `YYYY-MM-DD-[name-of-slug].mdx` convention.

In that file, add your text and images, using markdown in the expected way.

The base root directory for images is `/public/blog`. Feel free to add subfolders if you want.

Export a `metadata` object. The following properties are supported:

title: The name of the blog
sizzle: A catchy hook to draw readers in
author: A string array of author(s)
image: The primary image to show on thumbnails.
tags: A string array of keywords

### a note on tags

Currently, tags are manual. Please add them to the article, and then add your file to `_built/tags.json`. In a future revision, they will only need to be added to the article.
