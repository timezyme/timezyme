<script setup lang="ts">
import { Heading, Hr, Text } from '@vue-email/components'
import { siteConfig } from '~~/config/siteConfig'

import EmailPrimaryButton from '../PrimaryButton.vue'
import EmailWrapper from '../Wrapper.vue'

interface Props {
  emailVerificationUrl: string
  name?: string
  oneTimePassword: string
}
const props = defineProps<Props>()
</script>

<template>
  <EmailWrapper>
    <Heading>Login</Heading>
    <Hr />
    <Text class="text-base">
      Hey{{ props.name ? ` ${props.name}` : '' }},
    </Text>
    <Text class="text-base">
      you requested a login email from {{ siteConfig.name }}.
    </Text>
    <Text class="text-base">
      You can log in by clicking the button below:
    </Text>
    <EmailPrimaryButton :href="emailVerificationUrl">
      Click to log in
    </EmailPrimaryButton>
    <Text class="text-base">
      Or, copy and paste this temporary email verification code:
    </Text>
    <Text class="text-base p-4 bg-gray-100 rounded-lg">
      {{ oneTimePassword }}
    </Text>
    <Text class="text-sm text-gray-500">
      If you didn't try to login, you can safely ignore this email.
    </Text>
  </EmailWrapper>
</template>
