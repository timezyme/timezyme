<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageBreadcrumb, mapContentNavigation } from '#ui-pro/utils/content'

const route = useRoute()

const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection('docs').path(route.path).first(),
)

if (!page.value) {
  throw createError({ fatal: true, statusCode: 404, statusMessage: 'Page not found' })
}

const { data: surround } = await useAsyncData(`${route.path}-docs-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  })
})

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigationDocs')

const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation?.value, page.value)).map(({ icon, ...link }) => link))

const links = [{
  icon: 'i-simple-icons-x',
  label: 'X',
  target: '_blank',
  to: 'https://x.com/timezyme',
}, {
  icon: 'i-simple-icons-discord',
  label: 'Discord',
  target: '_blank',
  to: 'https://discord.gg/timezyme',
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

            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                {{ $t('pages.docs.tocLinksTitle') }}
              </h3>
              <div class="flex items-center gap-3">
                <UButton
                  v-for="link in links"
                  :key="link.label"
                  :to="link.to"
                  :target="link.target"
                  :aria-label="link.label"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  :icon="link.icon"
                  square
                />
              </div>
            </div>
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
