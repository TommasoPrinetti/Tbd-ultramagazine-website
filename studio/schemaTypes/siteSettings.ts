import {defineField, defineType} from 'sanity'

// Singleton (document id `homepage`) overriding homepage chrome.
// The web app falls back to per-call fields while this document is absent,
// so creating it later is non-breaking.
export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'topBanner',
      title: 'Top banner',
      type: 'object',
      fields: [
        defineField({name: 'enabled', type: 'boolean', initialValue: true}),
        defineField({name: 'text', type: 'string'}),
        defineField({name: 'url', type: 'url'}),
      ],
    }),
    defineField({
      name: 'promoFeature',
      title: 'Homepage promo',
      type: 'object',
      fields: [
        defineField({name: 'enabled', type: 'boolean', initialValue: true}),
        defineField({
          name: 'mode',
          type: 'string',
          options: {list: ['temporaryCall', 'custom']},
          initialValue: 'temporaryCall',
        }),
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'ctaLabel', type: 'string'}),
        defineField({name: 'ctaUrl', type: 'string'}),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Homepage'}),
  },
})
