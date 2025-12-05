import { defineType,defineField } from "sanity";

export default defineType({
  name: "blogPost",
  type: "document",
  title: "Blog Post",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
        name:"category",
        type:"string",
        title:"Category",
        validation: (Rule) => Rule.required(),
    }),

    defineField({
    name:"publishedAt",
    type:"datetime",
    title:"Published At",
    validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      type: "text",
      title: "Short Description",
      description: "Used for previews and SEO.",
    }),

    // Optional hero image
    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: { hotspot: true },
    }),

    // Optional SECTIONS
    defineField({
      name: "sections",
      type: "array",
      title: "Sections",
      of: [{ type: "blogSection" }],
      description: "Optional subsections of your article.",
    }),
  ],
});