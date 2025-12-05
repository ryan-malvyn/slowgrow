// /schemas/blogSection.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogSection",
  type: "object",
  title: "Blog Section",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      description: "Optional. Used for TOC navigation.",
    }),

    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle (optional)",
    }),

    defineField({
      name: "image",
      type: "image",
      title: "Image (optional)",
      options: { hotspot: true },
    }),

    defineField({
      name: "content",
      type: "array",
      title: "Content (Rich Text)",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
});
