
import config from '@config';

export function getPageIdFromTitle(title: string) {
    return title.trim().replace(/\s+/g, '_');
}

export function getPageTitleFromId(id: string) {
    return id.trim().replace(/_/g, ' ');
}

export function getPageTemplate(template?: string) {
    let PageTemplate = config.wiki.templates.base;

    if (template) {
        if (Object.keys(config.wiki.templates).some(t => t.toLowerCase() === template.toLowerCase())) {
            PageTemplate = config.wiki.templates[template];
        }
    }

    return { ...PageTemplate };
}