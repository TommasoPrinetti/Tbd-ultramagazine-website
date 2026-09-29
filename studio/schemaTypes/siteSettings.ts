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
      description: 'Scrolling header strip. Overrides the per-call banner fields when set.',
      type: 'object',
      fields: [
        defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
        defineField({name: 'text', title: 'Text', type: 'string'}),
        defineField({name: 'url', title: 'Link URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'promoFeature',
      title: 'Homepage promo',
      description:
        "'Temporary call' features the latest call; 'Custom' shows the title/image/button below instead.",
      type: 'object',
      fields: [
        defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
        defineField({
          name: 'mode',
          title: 'Mode',
          type: 'string',
          options: {
            list: [
              {title: 'Temporary call', value: 'temporaryCall'},
              {title: 'Custom', value: 'custom'},
            ],
          },
          initialValue: 'temporaryCall',
        }),
        defineField({name: 'title', title: 'Title (custom mode)', type: 'string'}),
        defineField({name: 'image', title: 'Image (custom mode)', type: 'image', options: {hotspot: true}}),
        defineField({name: 'ctaLabel', title: 'Button label (custom mode)', type: 'string'}),
        defineField({
          name: 'ctaUrl',
          title: 'Button link (custom mode)',
          description: 'Internal (/issues/LAGNE) or external (https://…) link.',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Homepage'}),
  },
})
