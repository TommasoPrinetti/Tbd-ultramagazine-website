import {defineField, defineType} from 'sanity'

// Matches the live `issue` documents in dataset `tbd_issues` (read-only
// reconstruction — do not rename fields, the web app queries them).
export default defineType({
  name: 'issue',
  title: 'Issue',
  type: 'document',
  fields: [
    defineField({name: 'showPage', title: 'Show page', type: 'boolean', initialValue: true}),
    defineField({name: 'issueTitle', title: 'Issue title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'isLatestIssue', title: 'Latest issue', type: 'boolean', initialValue: false}),
    defineField({name: 'issueHeroText', title: 'Hero text', type: 'text'}),
    defineField({name: 'issueThumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
    defineField({name: 'issueCover', title: 'Cover', type: 'image', options: {hotspot: true}}),
    defineField({name: 'issuePrice', title: 'Price', type: 'number'}),
    defineField({
      name: 'issueCategory',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Issues', value: 'issues'},
          {title: 'Publications', value: 'publications'},
          {title: 'Special Projects', value: 'special projects'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'galleryImgList',
      title: 'Mag gallery',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'issueArticle',
          title: 'Article',
          fields: [
            defineField({name: 'section', title: 'Section', type: 'string'}),
            defineField({name: 'thumbnail', title: 'List thumbnail', type: 'image', options: {hotspot: true}}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Abstract', type: 'text'}),
            defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}}),
            defineField({
              name: 'legacyName',
              title: 'Legacy articleName',
              type: 'string',
              description: 'Exact JSON articleName (e.g. THE ANIMAL TURN ISSUE) so old URLs keep resolving.',
            }),
            defineField({name: 'hero', title: 'Hero image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'autore', title: 'Author', type: 'string'}),
            defineField({name: 'note_autore', title: 'Editor note', type: 'string'}),
            defineField({name: 'ultra', title: 'ULTRA article', type: 'boolean', initialValue: false}),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H2', value: 'h2'},
                    {title: 'Quote', value: 'blockquote'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Underline', value: 'underline'},
                    ],
                  },
                },
                {
                  name: 'bodyImage',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                  fields: [{name: 'caption', type: 'string'}],
                },
                {
                  name: 'gallery',
                  title: 'Gallery',
                  type: 'object',
                  fields: [
                    {
                      name: 'images',
                      type: 'array',
                      of: [
                        {
                          type: 'image',
                          options: {hotspot: true},
                          fields: [{name: 'caption', type: 'string', title: 'Caption'}],
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: {images: 'images'},
                    prepare: ({images}) => ({
                      title: `Gallery (${(images as unknown[] | undefined)?.length ?? 0} images)`,
                    }),
                  },
                },
              ],
            }),
            defineField({name: 'showDidascalie', title: 'Show captions', type: 'boolean', initialValue: false}),
            defineField({name: 'didascalie', title: 'Captions', type: 'array', of: [{type: 'text'}]}),
            defineField({name: 'showBibliografia', title: 'Show bibliography', type: 'boolean', initialValue: false}),
            defineField({name: 'bibliografie', title: 'Bibliography', type: 'array', of: [{type: 'text'}]}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'section', media: 'thumbnail'},
          },
        },
      ],
    }),
    defineField({name: 'CowElementText', title: 'Cow element text', type: 'text'}),
    defineField({name: 'CowElementImg', title: 'Cow element image', type: 'image'}),
    defineField({name: 'CowImgDidascalia', title: 'Cow image caption', type: 'string'}),
    defineField({name: 'isIssueUltra', title: 'Has ULTRA moment', type: 'boolean', initialValue: false}),
    defineField({name: 'ultraCover', title: 'ULTRA cover', type: 'image'}),
    defineField({name: 'UltraissueTitle', title: 'ULTRA title', type: 'string'}),
    defineField({name: 'UltraissueHeroText', title: 'ULTRA hero text', type: 'text'}),
    defineField({name: 'UltraissueThumbnail', title: 'ULTRA thumbnail', type: 'image'}),
    defineField({name: 'UltraCowElementTitle', title: 'ULTRA cow title', type: 'string'}),
    defineField({name: 'UltraCowElementText', title: 'ULTRA cow text', type: 'text'}),
    defineField({
      name: 'UltraGalleryFolder',
      title: 'ULTRA gallery',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'layoutOption',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Classic', value: 'Classic'},
          {title: 'Manifesto', value: 'Manifesto'},
          {title: 'Ibrido', value: 'Ibrido'},
        ],
      },
    }),
    defineField({name: 'manifestoTitle', title: 'Manifesto title', type: 'string'}),
    defineField({name: 'manifestoText', title: 'Manifesto text', type: 'text'}),
    defineField({name: 'fileDownloadButton', title: 'Download button', type: 'boolean', initialValue: false}),
  ],
  preview: {
    select: {title: 'issueTitle', media: 'issueCover'},
  },
})
