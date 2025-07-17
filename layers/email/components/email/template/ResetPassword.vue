<script setup lang="ts">
import { Heading, Hr, Text } from '@vue-email/components'
import { siteConfig } from '~~/config/siteConfig'

import EmailPrimaryButton from '../PrimaryButton.vue'
import EmailWrapper from '../Wrapper.vue'

interface Props {
  name?: string
  url: string
}
const props = defineProps<Props>()
</script>

<template>
  <EmailWrapper>
    <Heading>Reset your password</Heading>
    <Hr />
    <Text class="text-base">
      Hey{{ props.name ? ` ${props.name}` : '' }},
    </Text>
    <Text class="text-base">
      you requested a password request from {{ siteConfig.name }}.
    </Text>
    <Text class="text-base">
      You can reset your password by clicking the button below:
    </Text>
    <EmailPrimaryButton :href="url">
      Reset password
    </EmailPrimaryButton>
    <Text class="text-sm text-gray-500">
      If you didn't try to reset your password, you can safely ignore this email.
    </Text>
  </EmailWrapper>
</template>
