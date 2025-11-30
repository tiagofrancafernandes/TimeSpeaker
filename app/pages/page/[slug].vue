<script setup lang="ts">
import type { StaticPagesCollectionItem } from '@nuxt/content'

type StringOrNull = string | null

const slug = useRoute().params.slug

const filePathFromSlug = (slug: StringOrNull): string => {
    slug = String((slug as StringOrNull) || '')
        .replaceAll(/^(\/){1,}/g, '')
        .replaceAll(/^(page){1,}/g, '')
        .replaceAll(/^(pages){1,}/g, '')
        .replaceAll(/^(staticPages){1,}/g, '')
        .replaceAll(/^(staticpages){1,}/g, '')
        .replaceAll(/^(\/){1,}/g, '')

    return `/staticpages/${slug}`
}

const { data: currentPageData } = await useAsyncData(`pages-${slug}`, () => {
    return queryCollection('staticPages')
        .path(filePathFromSlug(slug as StringOrNull))
        .first()
})

// const allStaticPageuments = await queryCollection('staticPages').all();
const staticPageData = await queryCollection('staticPages')
    .path(filePathFromSlug(slug as StringOrNull))
    .first()

console.log('currentPageData slug: "%s"', slug, currentPageData.value)
console.log('staticPageData slug: "%s"', slug, staticPageData)
</script>

<template>
    <!-- Render the pages currentPageData as Prose & Vue components -->
    <h4 class="text-xl text-orange-600">{{ currentPageData?.title }}</h4>
    <ContentRenderer v-if="currentPageData" :value="currentPageData" />
    <div v-else>Page not found</div>
</template>
