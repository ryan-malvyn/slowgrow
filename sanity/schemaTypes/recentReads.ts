import { defineType, defineField } from "sanity";

export default defineType({
  name: "recentRead",
  title: "Recent Read",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required(),
    }),
    defineField({
        name: "author",
        type: "string",
        title: "Author",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name:"source",
        type: "string",
        title: "Source",
        validation: Rule => Rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Link",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Short Description",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: { hotspot: true },
    }),
  ],
});
