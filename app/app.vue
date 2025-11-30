<script setup>
import { findPageBreadcrumb } from '@nuxt/content/utils'
import { mapContentNavigation } from '@nuxt/ui/utils/content'

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
            <TopNavigation :page="page">
                <UPageHeader v-bind="page">
                    <template #headline>
                        <UBreadcrumb :items="breadcrumb" />
                    </template>
                </UPageHeader>
            </TopNavigation>
            <NuxtPage />
        </UPage>
    </UApp>
</template>
