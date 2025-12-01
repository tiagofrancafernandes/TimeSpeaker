<script setup lang="ts">
import { makeStaticDocUri } from '~/helpers/doc-helpers';
import type { AnyObject } from '~/helpers/string-helpers';

const navigationItems = ref([
    {
        label: 'Home',
        icon: 'i-lucide-home',
        to: '/',
    },
    /* *
    {
        label: 'Docs',
        icon: 'i-lucide-book-open',
        to: '/docs/getting-started',
        children: [
            {
                label: 'Introduction',
                description: 'Fully styled and customizable components for Nuxt.',
                icon: 'i-lucide-house',
            },
            {
                label: 'Installation',
                description: 'Learn how to install and configure Nuxt UI in your application.',
                icon: 'i-lucide-cloud-download',
            },
            {
                label: 'Icons',
                icon: 'i-lucide-smile',
                description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
            },
            {
                label: 'Colors',
                icon: 'i-lucide-swatch-book',
                description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
            },
            {
                label: 'Theme',
                icon: 'i-lucide-cog',
                description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
            },
        ],
    },
    {
        label: 'Composables',
        icon: 'i-lucide-database',
        to: '/docs/composables',
        children: [
            {
                label: 'defineShortcuts',
                icon: 'i-lucide-file-text',
                description: 'Define shortcuts for your application.',
                to: '/docs/composables/define-shortcuts',
            },
            {
                label: 'useOverlay',
                icon: 'i-lucide-file-text',
                description: 'Display a modal/slideover within your application.',
                to: '/docs/composables/use-overlay',
            },
            {
                label: 'useToast',
                icon: 'i-lucide-file-text',
                description: 'Display a toast within your application.',
                to: '/docs/composables/use-toast',
            },
        ],
    },
    {
        label: 'Components',
        icon: 'i-lucide-box',
        to: '/docs/components',
        active: true,
        children: [
            {
                label: 'Link',
                icon: 'i-lucide-file-text',
                description: 'Use NuxtLink with superpowers.',
                to: '/docs/components/link',
            },
            {
                label: 'Modal',
                icon: 'i-lucide-file-text',
                description: 'Display a modal within your application.',
                to: '/docs/components/modal',
            },
            {
                label: 'NavigationMenu',
                icon: 'i-lucide-file-text',
                description: 'Display a list of links.',
                to: '/docs/components/navigation-menu',
            },
            {
                label: 'Pagination',
                icon: 'i-lucide-file-text',
                description: 'Display a list of pages.',
                to: '/docs/components/pagination',
            },
            {
                label: 'Popover',
                icon: 'i-lucide-file-text',
                description: 'Display a non-modal dialog that floats around a trigger element.',
                to: '/docs/components/popover',
            },
            {
                label: 'Progress',
                icon: 'i-lucide-file-text',
                description: 'Show a horizontal bar to indicate task progression.',
                to: '/docs/components/progress',
            },
        ],
    },
    {
        label: 'Help',
        icon: 'i-lucide-circle-help',
        disabled: true,
    },
    /** */
]);

const pushItemToMenu = (item: any) => {
    let currentNavigationItems = navigationItems.value || [];
    currentNavigationItems.push(item);
    navigationItems.value = currentNavigationItems;
};

const iconList = [
    'i-lucide-home',
    'i-lucide-book-open',
    'i-lucide-house',
    'i-lucide-cloud-download',
    'i-lucide-smile',
    'i-lucide-swatch-book',
    'i-lucide-cog',
    'i-lucide-database',
    'i-lucide-file-text',
    'i-lucide-box',
    'i-lucide-circle-help',
];

const allStaticDocs = await queryCollection('staticDocs').order('date', 'DESC').all();

const docsList: any = {
    label: 'Docs',
    icon: 'i-lucide-book-open',
    to: '/docs',
    children: [],
};

for (let docItem of allStaticDocs) {
    let uri = makeStaticDocUri(docItem);
    let icon = 'i-lucide-book-open';

    if (['/docs/', 'docs/'].includes(uri)) {
        icon = 'i-lucide-book-open';
    }

    docsList.children.push({
        label: docItem?.label || docItem?.title || 'Doc item',
        description: docItem?.description || docItem?.title || '',
        to: uri,
        icon,
        ...docItem,
    });
}

pushItemToMenu(docsList);

pushItemToMenu({
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    badge: '1.8k',
    to: 'https://github.com/tiagofrancafernandes',
    target: '_blank',
});
</script>

<template>
    <div class="bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-50">
        <div class="w-full md:w-10/12 md:mx-auto flex gap-4 items-center md:flex-1 md:justify-center">
            <UNavigationMenu :items="navigationItems" />
            <UColorModeSwitch :ui="{ base: ['cursor-pointer'] }" />
        </div>
        <slot />
    </div>
</template>
