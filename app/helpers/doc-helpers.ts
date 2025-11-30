import type { StaticDocsCollectionItem } from '@nuxt/content';

import type { StringOrNull } from './string-helpers';

export const makeStaticDocUri = (item: StaticDocsCollectionItem): string => {
    return (
        '/docs/' +
        String((item?.path as StringOrNull) || '')
            .replaceAll(/^(\/){1,}/g, '')
            .replaceAll(/^(staticDocs){1,}/g, '')
            .replaceAll(/^(staticdocs){1,}/g, '')
            .replaceAll(/^(\/){1,}/g, '')
    );
};
