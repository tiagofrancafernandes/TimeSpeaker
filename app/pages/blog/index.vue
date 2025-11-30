<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

type StringOrNull = string | null
type AnyObject = Record<string, StringOrNull>

const router = useRouter()
const { data: postList } = await useAsyncData(() => queryCollection('blog').all())
// const allPosts = await queryCollection('blog').order('date', 'DESC').all();

console.log('postList', postList.value)
// console.log('allPosts', allPosts);

useSeoMeta({
    title: 'Blog',
    description: 'Blog posts',
})

const makeUri = (item: BlogCollectionItem): string => {
    return (
        '/blog/' +
        String((item?.path as StringOrNull) || '')
            .replaceAll(/^(\/){1,}/g, '')
            .replaceAll(/^(blog){1,}/g, '')
            .replaceAll(/^(blog){1,}/g, '')
            .replaceAll(/^(\/){1,}/g, '')
    )
}

const formatTitle = (item: BlogCollectionItem): string => {
    let title = String((item?.title as StringOrNull) || '')
        .replaceAll(`\n`, '')
        .trim()

    if (title?.length <= 50) {
        return title
    }

    return title.slice(0, 45) + ' ...'
}
</script>

<template>
    <h4 class="text-xl text-orange-600">Blog Home</h4>

    <div>
        <ul>
            <li v-for="(item, itemIndex) in postList" :key="itemIndex">
                <NuxtLink :to="makeUri(item)">{{ formatTitle(item) }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>
