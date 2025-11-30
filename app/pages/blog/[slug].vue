<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

type StringOrNull = string | null

const slug = useRoute().params.slug

const filePathFromSlug = (slug: StringOrNull): string => {
    slug = String((slug as StringOrNull) || '')
        .replaceAll(/^(\/){1,}/g, '')
        .replaceAll(/^(blog){1,}/g, '')
        .replaceAll(/^(blog){1,}/g, '')
        .replaceAll(/^(blog){1,}/g, '')
        .replaceAll(/^(\/){1,}/g, '')

    return `/blog/${slug}`
}

const { data: currentPageData } = await useAsyncData(`blog-${slug}`, () => {
    return queryCollection('blog')
        .path(filePathFromSlug(slug as StringOrNull))
        .first()
})

// const allStaticDocuments = await queryCollection('blog').all();
// const staticDocumentData = await queryCollection('blog').path(filePathFromSlug(slug as StringOrNull)).first();

console.log('currentPageData slug: "%s"', slug, currentPageData.value)
// console.log('staticDocumentData slug: "%s"', slug, staticDocumentData);
</script>

<template>
    <!-- Render the blog currentPageData as Prose & Vue components -->
    <h4 class="text-xl text-orange-600">{{ currentPageData?.title }}</h4>
    <ContentRenderer v-if="currentPageData" :value="currentPageData" />
    <div v-else>Page not found</div>
</template>
