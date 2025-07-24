<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils/content'

const route = useRoute()

// Remove /docs2 prefix from the path for content query
const contentPath = route.path.replace('/docs2', '') || '/'

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs2').path(contentPath).first())
if (!page.value) {
  throw createError({ fatal: true, statusCode: 404, statusMessage: 'Page not found' })
}

const { data: surround } = await useAsyncData(`${route.path}-docs2-surround`, () => {
  return queryCollectionItemSurroundings('docs2', contentPath, {
    fields: ['description'],
  })
})

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigationDocs2')

const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation?.value, page.value)).map(({ icon, ...link }) => link))

const links = [{
  label: 'Nuxters',
  target: '_blank',
  to: 'https://nuxters.nuxt.com',
}, {
  label: 'Video Courses',
  target: '_blank',
  to: 'https://masteringnuxt.com/nuxt3?ref=nuxt',
}, {
  label: 'Nuxt on GitHub',
  target: '_blank',
  to: 'https://github.com/nuxt',
}]

useSeoMeta({
  description: page.value.description,
  ogDescription: page.value.description,
  ogTitle: `${page.value.navigation?.title ? page.value.navigation.title : page.value.title}`,
  title: page.value.navigation?.title ? page.value.navigation.title : page.value.title,
  titleTemplate: '%s',
})

definePageMeta({
  layout: 'docs',
})

defineOgImageComponent('OgImageTemplate')
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :title="page.title">
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>

      <template
        v-if="page.links?.length"
        #links
      >
        <UButton
          v-for="link in page.links"
          :key="link.label"
          color="neutral"
          variant="outline"
          :target="link.to.startsWith('http') ? '_blank' : undefined"
          v-bind="link"
        >
          <template
            v-if="link.avatar"
            #leading
          >
            <UAvatar
              v-bind="link.avatar"
              size="2xs"
            />
          </template>
        </UButton>
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />

      <USeparator />

      <UContentSurround :surround="(surround as any)" />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :links="page.body.toc.links"
        :title="$t('pages.docs.tocTitle')"
        class="z-[2]"
      >
        <template #bottom>
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="page.body?.toc?.links?.length"
              type="dashed"
            />

            <UPageLinks
              :title="$t('pages.docs.tocLinksTitle')"
              :links="links"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
