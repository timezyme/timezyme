<script setup lang="ts">
import { Heading, Hr, Text } from '@vue-email/components'

import EmailWrapper from '../Wrapper.vue'

interface Props {
  email: string
  logoUrl?: string
  message: string
  name: string
}
defineProps<Props>()
</script>

<template>
  <EmailWrapper :logo-url="logoUrl">
    <Heading>Contact Form Submission</Heading>
    <Hr />
    <Text class="text-base">
      Name: {{ name }}
    </Text>
    <Text class="text-base">
      Email: {{ email }}
    </Text>
    <Text class="text-base">
      Message: {{ message }}
    </Text>
  </EmailWrapper>
</template>
