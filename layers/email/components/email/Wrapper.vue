<script setup lang="ts">
import { Container, Font, Head, Html, Link, Row, Section, Tailwind, Text } from '@vue-email/components'
import { siteConfig } from '~~/config/siteConfig'

import EmailLogo from './Logo.vue'

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        primary: '#FC8907',
      },
    },
  },
}

const footnoteClasses = 'text-center text-[12px]'
</script>

<template>
  <Tailwind :config="tailwindConfig as any">
    <Html
      lang="en"
      dir="ltr"
    >
      <Head>
        <Font
          font-family="Onest"
          fallback-font-family="Arial"
          :font-weight="400"
          font-style="normal"
        />
      </Head>

      <Section>
        <Row>
          <Container class="border border-solid rounded-lg p-4 border-gray-300">
            <EmailLogo />

            <slot />
          </Container>
        </Row>
      </Section>

      <Section>
        <Row>
          <Text
            class="mb-0"
            :class="[footnoteClasses]"
          >
            {{ siteConfig.name }}
          </Text>
          <Text
            class="mt-0"
            :class="[footnoteClasses]"
          >
            <Link
              :href="siteConfig.url"
              class="text-primary"
              :class="[footnoteClasses]"
            >
              {{ siteConfig.domain }}
            </Link>
          </Text>
        </Row>
      </Section>
    </Html>
  </Tailwind>
</template>
