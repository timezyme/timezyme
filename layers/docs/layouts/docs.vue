<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigationDocs')
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <UContentNavigation
                :navigation="navigation"
                highlight
              />
            </UPageAside>
          </template>

          <div>
            <DocsComingSoonBanner />
            <slot />
          </div>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
