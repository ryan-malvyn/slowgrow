import { type SchemaTypeDefinition } from 'sanity'

import blogPost from './blogPost';
import blogSections from './blogSections';
import recentRead from './recentReads';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost,blogSections,recentRead],
}
