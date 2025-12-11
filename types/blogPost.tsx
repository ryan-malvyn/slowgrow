export interface BlogPost {
  _id: string;
  category: string;
  description: string;
  mainImage: SanityImage;
  publishedAt: string; // or Date, depending on how you parse
  sections: BlogSection[];
  slug: SanitySlug;
  title: string;
}

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface SanitySlug {
  _type: "slug";
  current: string;
}

interface BlogSection {
  _type?: string;
  title?: string;
  body?: any;
}
