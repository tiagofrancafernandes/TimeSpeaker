<script setup>
import { findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'));

const router = useRouter();
const page = router.currentRoute.value;

console.log('page', page);

const breadcrumb = computed(
    () =>
        mapContentNavigation(findPageBreadcrumb(navigation?.value, page?.path, { indexAsChild: true })).map(
            ({ icon, ...link }) => link
        ),
    { deep: 0 }
);
</script>

<template>
    <UApp>
        <UPage>
            <TopNavigation :page="page" class="w-full md:w-10/12 md:mx-auto md:flex-1 md:justify-center" />
            <UPageHeader v-bind="page">
                <template #headline>
                    <UBreadcrumb :items="breadcrumb" />
                </template>
            </UPageHeader>

            <main class="px-2 md:px-4 pb-2 md:pb-4">
                <NuxtPage />
            </main>
        </UPage>
    </UApp>
</template>
