<script setup lang="ts">
import type { StaticDocsCollectionItem } from '@nuxt/content';

type StringOrNull = string | null;
type AnyObject = Record<string, StringOrNull>;

const router = useRouter();
const currentPage = router.currentRoute.value;
const { data: currentPageData } = await useAsyncData(() => queryCollection('staticDocs').path('/').first());
// const { data: allContent } = await useAsyncData(() => queryCollection('staticDocs').all());

const allStaticDocs = await queryCollection('staticDocs').order('date', 'DESC').all();

console.log('docs index currentPage path', currentPage?.path);
console.log('docs index currentPageData', currentPageData);
// console.log('allContent', allContent.value);
console.log('allStaticDocs', allStaticDocs);

useSeoMeta({
    title: currentPageData.value?.title,
    description: currentPageData.value?.description,
});

const makeUri = (item: StaticDocsCollectionItem): string => {
    return (
        '/docs/' +
        String((item?.path as StringOrNull) || '')
            .replaceAll(/^(\/){1,}/g, '')
            .replaceAll(/^(staticDocs){1,}/g, '')
            .replaceAll(/^(staticdocs){1,}/g, '')
            .replaceAll(/^(\/){1,}/g, '')
    );
};

const formatTitle = (item: StaticDocsCollectionItem): string => {
    let title = String((item?.title as StringOrNull) || '')
        .replaceAll(`\n`, '')
        .trim();

    if (title?.length <= 50) {
        return title;
    }

    return title.slice(0, 45) + ' ...';
};
</script>

<template>
    <h4 class="text-xl text-orange-600">Docs Home</h4>
    <ContentRenderer v-if="currentPageData" :value="currentPageData" />
    <div v-else>Page not found</div>

    <div>
        <ul>
            <li v-for="(item, itemIndex) in allStaticDocs" :key="itemIndex">
                <NuxtLink :to="makeUri(item)">{{ formatTitle(item) }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>
