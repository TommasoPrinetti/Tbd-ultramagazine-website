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
      name: 'releaseOrder',
      title: 'Release order (No.)',
      description: '1 = first shown on the homepage, 2 = second, … Issues without a number go last.',
      type: 'number',
      validation: (r) => r.integer().min(1),
    }),
    defineField({name: 'issueHeroText', title: 'Hero text', type: 'text'}),
    defineField({name: 'issueThumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
    defineField({name: 'issueCover', title: 'Cover', type: 'image', options: {hotspot: true}}),
    defineField({name: 'issuePrice', title: 'Price', type: 'number', validation: (r) => r.min(0)}),
    defineField({name: 'showGallery', title: 'Show gallery', type: 'boolean', initialValue: true}),
    defineField({
      name: 'galleryImgList',
      title: 'Mag gallery',
      type: 'array',
      hidden: ({parent}) => parent?.showGallery === false,
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({name: 'showArticles', title: 'Show articles', type: 'boolean', initialValue: true}),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      hidden: ({parent}) => parent?.showArticles === false,
      of: [
        {
          type: 'object',
          name: 'issueArticle',
          title: 'Article',
          fields: [
            defineField({name: 'section', title: 'Section', type: 'string'}),
            defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Abstract', type: 'text'}),
            defineField({
              name: 'showReadAll',
              title: 'Show READ ALL button',
              type: 'boolean',
              initialValue: true,
            }),
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
            defineField({
              name: 'didascalie',
              title: 'Captions',
              type: 'array',
              hidden: ({parent}) => parent?.showDidascalie === false,
              of: [{type: 'text'}],
            }),
            defineField({name: 'showBibliografia', title: 'Show bibliography', type: 'boolean', initialValue: false}),
            defineField({
              name: 'bibliografie',
              title: 'Bibliography',
              type: 'array',
              hidden: ({parent}) => parent?.showBibliografia === false,
              of: [{type: 'text'}],
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'section', media: 'thumbnail'},
          },
        },
      ],
    }),
    defineField({name: 'showCow', title: 'Show cow element', type: 'boolean', initialValue: true}),
    defineField({
      name: 'CowElementText',
      title: 'Cow element text',
      type: 'text',
      hidden: ({parent}) => parent?.showCow === false,
    }),
    defineField({
      name: 'CowElementImg',
      title: 'Cow element image',
      type: 'image',
      hidden: ({parent}) => parent?.showCow === false,
    }),
    defineField({
      name: 'CowImgDidascalia',
      title: 'Cow image caption',
      type: 'string',
      hidden: ({parent}) => parent?.showCow === false,
    }),
    defineField({name: 'isIssueUltra', title: 'Has ULTRA moment', type: 'boolean', initialValue: false}),
    defineField({
      name: 'ultraCover',
      title: 'ULTRA cover',
      type: 'image',
      hidden: ({parent}) => parent?.isIssueUltra === false,
    }),
    defineField({
      name: 'UltraissueTitle',
      title: 'ULTRA title',
      type: 'string',
      hidden: ({parent}) => parent?.isIssueUltra === false,
    }),
    defineField({
      name: 'UltraissueHeroText',
      title: 'ULTRA hero text',
      type: 'text',
      hidden: ({parent}) => parent?.isIssueUltra === false,
    }),
    defineField({
      name: 'UltraissueThumbnail',
      title: 'ULTRA thumbnail',
      type: 'image',
      hidden: ({parent}) => parent?.isIssueUltra === false,
    }),
    defineField({
      name: 'UltraCowElementText',
      title: 'ULTRA cow text',
      type: 'text',
      hidden: ({parent}) => parent?.isIssueUltra === false,
    }),
    defineField({
      name: 'UltraGalleryFolder',
      title: 'ULTRA gallery',
      type: 'array',
      hidden: ({parent}) => parent?.isIssueUltra === false,
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({name: 'showManifesto', title: 'Show manifesto', type: 'boolean', initialValue: true}),
    defineField({
      name: 'manifestoTitle',
      title: 'Manifesto title',
      type: 'string',
      hidden: ({parent}) => parent?.showManifesto === false,
    }),
    defineField({
      name: 'manifestoText',
      title: 'Manifesto text',
      type: 'text',
      hidden: ({parent}) => parent?.showManifesto === false,
    }),
    defineField({
      name: 'fileDownloadButton',
      title: 'Download button',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.showManifesto === false,
    }),
    defineField({
      name: 'manifestoFile',
      title: 'Download file',
      type: 'file',
      options: {accept: '.pdf'},
      hidden: ({parent}) => parent?.showManifesto === false || parent?.fileDownloadButton !== true,
    }),
    defineField({
      name: 'manifestoDownloadLabel',
      title: 'Download button label',
      type: 'string',
      initialValue: 'DOWNLOAD PDF',
      hidden: ({parent}) => parent?.showManifesto === false || parent?.fileDownloadButton !== true,
    }),
    defineField({
      name: 'layoutOption',
      title: 'Layout (deprecated)',
      description: 'No longer used: block visibility is controlled by the Show toggles above.',
      type: 'string',
      hidden: true,
      options: {
        list: [
          {title: 'Classic', value: 'Classic'},
          {title: 'Manifesto', value: 'Manifesto'},
          {title: 'Ibrido', value: 'Ibrido'},
        ],
      },
    }),
  ],
  preview: {
    select: {title: 'issueTitle', media: 'issueCover'},
  },
})
