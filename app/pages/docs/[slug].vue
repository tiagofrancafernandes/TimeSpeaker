<script setup lang="ts">
import type { StaticDocsCollectionItem } from '@nuxt/content';

type StringOrNull = string | null;

const slug = useRoute().params.slug;

const filePathFromSlug = (slug: StringOrNull): string => {
    slug = String((slug as StringOrNull) || '')
        .replaceAll(/^(\/){1,}/g, '')
        .replaceAll(/^(docs){1,}/g, '')
        .replaceAll(/^(staticDocs){1,}/g, '')
        .replaceAll(/^(staticdocs){1,}/g, '')
        .replaceAll(/^(\/){1,}/g, '');

    return `/staticdocs/${slug}`;
};

const { data: currentPageData } = await useAsyncData(`docs-${slug}`, () => {
    return queryCollection('staticDocs')
        .path(filePathFromSlug(slug as StringOrNull))
        .first();
});

// const allStaticDocuments = await queryCollection('staticDocs').all();
// const staticDocumentData = await queryCollection('staticDocs').path(filePathFromSlug(slug as StringOrNull)).first();

console.log('currentPageData slug: "%s"', slug, currentPageData.value);
// console.log('staticDocumentData slug: "%s"', slug, staticDocumentData);
</script>

<template>
    <!-- Render the docs currentPageData as Prose & Vue components -->
    <h4 class="text-xl text-orange-600">{{ currentPageData?.title }}</h4>
    <ContentRenderer v-if="currentPageData" :value="currentPageData" />
    <div v-else>Page not found</div>
</template>
