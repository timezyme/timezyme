import type { BannerProps } from '@nuxt/ui-pro'

const LOGGER_PREFIX = '[banner.get]:'

export default defineEventHandler(async () => {
  const serverLogger = useServerLogger()

  try {
    const item = await hubKV().getItem(BANNER_KV_KEY, {
      defaultValue: null,
    }) as Banner | null

    if (!item) {
      return null
    }

    const bannerProps: BannerProps = {
      close: item.isClosable,
      color: item.color,
      icon: item.icon,
      target: item.target,
      title: item.title,
    }

    return {
      banner: item,
      bannerProps,
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get banner`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
