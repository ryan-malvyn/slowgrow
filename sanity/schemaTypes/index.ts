import { type SchemaTypeDefinition } from 'sanity'

import blogPost from './blogPost';
import blogSections from './blogSections';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost,blogSections],
}
