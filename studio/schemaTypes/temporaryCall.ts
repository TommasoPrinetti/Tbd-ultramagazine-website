import {defineField, defineType} from 'sanity'

// Matches the live `temporaryCall` documents in `tbd_issues`, plus the new
// homepage chrome fields the web app already queries (all optional — old
// docs keep working through frontend fallbacks).
export default defineType({
  name: 'temporaryCall',
  title: 'Temporary call',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'showPage', title: 'Show page', type: 'boolean', initialValue: true}),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'text', validation: (r) => r.required()}),
    defineField({name: 'ctaText', title: 'CTA label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'openDate', title: 'Open date', type: 'datetime', validation: (r) => r.required()}),
    defineField({name: 'endDate', title: 'End date', type: 'datetime', validation: (r) => r.required()}),
    defineField({
      name: 'referenceEmail',
      title: 'Reference email',
      type: 'email',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'hrefExternal',
      title: 'External link',
      description: 'Optional: used as the call download fallback and the top-banner link fallback.',
      type: 'url',
    }),
    defineField({name: 'downloadPdf', title: 'Download PDF', type: 'file', options: {accept: '.pdf'}}),
    defineField({
      name: 'bannerEnabled',
      title: 'Top banner: enabled',
      type: 'boolean',
      initialValue: true,
      description: 'Fallback only: the Homepage top banner overrides this when set.',
    }),
    defineField({
      name: 'bannerText',
      title: 'Top banner: text',
      type: 'string',
      description: 'Fallback only: the Homepage top banner overrides this when set.',
    }),
    defineField({
      name: 'bannerUrl',
      title: 'Top banner: link URL',
      type: 'url',
      description: 'Fallback only: the Homepage top banner overrides this when set.',
    }),
    defineField({
      name: 'promoEnabled',
      title: 'Homepage promo: enabled',
      type: 'boolean',
      initialValue: true,
      description: 'Fallback only: the Homepage promo overrides this when set.',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
})
