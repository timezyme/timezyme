<script setup lang="ts">
import { Heading, Hr, Text } from '@vue-email/components'
import { siteConfig } from '~~/config/siteConfig'

import EmailPrimaryButton from '../PrimaryButton.vue'
import EmailWrapper from '../Wrapper.vue'

interface Props {
  emailVerificationUrl: string
}
defineProps<Props>()
</script>

<template>
  <EmailWrapper>
    <Heading>Waitlist Confirmation</Heading>
    <Hr />
    <Text class="text-base">
      Hey,
    </Text>
    <Text class="text-base">
      you requested to join the waitlist at {{ siteConfig.name }}.
    </Text>
    <Text class="text-base">
      You can confirm your request in by clicking the button below:
    </Text>
    <EmailPrimaryButton :href="emailVerificationUrl">
      Click to join the waitlist
    </EmailPrimaryButton>
    <Text class="text-sm text-gray-500">
      If you didn't try to subscribe, you can safely ignore this email.
    </Text>
  </EmailWrapper>
</template>
