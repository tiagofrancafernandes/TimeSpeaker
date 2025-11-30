<script setup lang="ts">
import type { StaticPagesCollectionItem } from '@nuxt/content';

type StringOrNull = string | null;
type AnyObject = Record<string, StringOrNull>;

const router = useRouter();
const currentPage = router.currentRoute.value;
const { data: currentPageData } = await useAsyncData(() => queryCollection('staticPages').path('/').first());
const { data: allContent } = await useAsyncData(() => queryCollection('staticPages').all());

const allStaticPages = await queryCollection('staticPages').order('date', 'DESC').all();

console.log('pages index currentPage path', currentPage?.path);
console.log('pages index currentPageData', currentPageData);
console.log('allContent', allContent.value);
console.log('allStaticPages', allStaticPages);

useSeoMeta({
    title: currentPageData.value?.title,
    description: currentPageData.value?.description,
});

const makeUri = (item: StaticPagesCollectionItem): string => {
    return (
        '/pages/' +
        String((item?.path as StringOrNull) || '')
            .replaceAll(/^(\/){1,}/g, '')
            .replaceAll(/^(staticPages){1,}/g, '')
            .replaceAll(/^(staticpages){1,}/g, '')
            .replaceAll(/^(\/){1,}/g, '')
    );
};

const formatTitle = (item: StaticPagesCollectionItem): string => {
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
    <h4 class="text-xl text-orange-600">Pages Home</h4>
    <ContentRenderer v-if="currentPageData" :value="currentPageData" />
    <div v-else>Page not found</div>

    <div>
        <ul>
            <li v-for="(item, itemIndex) in allStaticPages" :key="itemIndex">
                <NuxtLink :to="makeUri(item)">{{ formatTitle(item) }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>
