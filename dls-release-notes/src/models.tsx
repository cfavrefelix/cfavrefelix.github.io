export interface APIResponse {
    __self: string;
}

export interface ArchiveResponseModel extends APIResponse {
    product: string;
    language: string;
    alternative_langauges: AlternativeLanguageModel[],
    taxonomies: string,
    releases: ReleaseModel[];
    labels: string,
}

export interface AlternativeLanguageModel {
    id: string;
    url: string;
    title: string;
}
export interface ReleaseModel {
    id: string;
    url: string;
    title: string;
    date: string;
}

export interface ReleaseNoteResponseModel extends APIResponse {
    id: string;
    title: string;
    date: string;
    language: string;
    next?: string;
    previous?: string;
    content_parts: ReleaseNotePart[];
}
export interface ReleaseNotePart {
    id?: string;
    title?: string;
    content?: string;
    type?: string;
    highlight?: boolean;
    taxonomies?: 'all' | {
        [taxonomy: string]: string[]
    };
    tags?: string[];
    content_parts?: ReleaseNotePart[];
}

export interface TaxonomiesResponseModel extends APIResponse {
    taxonomies: TaxonomiesModel[];
}

export interface TaxonomiesModel {
    id: string;
    title: string;
    pills?: boolean;
    options: TaxonomiesOptionModel[];
}

export interface TaxonomiesOptionModel {
    id: string;
    title: string;
    color?: string;
}

export interface AppOptions {
    archiveUrl: string;
    showHeader?: boolean;
    routingStrategy?: RoutingStrategy;
    defaultToArchive?: boolean;
    currentReleaseNote?: string;
    setPageTitle?: boolean;
    productName?: string;
    alwaysDisplayAnchorNav?: boolean;
}

export type RoutingStrategy = 'hash' | 'memory' | 'browser';

export interface ModulePartModel extends ReleaseNotePart {
    type: 'module';
    id: string;
}

export function isModule(input: ReleaseNotePart): input is ModulePartModel {
    return (input as ModulePartModel).type === 'module' && !!(input as ModulePartModel).id;
}

export interface IntroPartModel extends ReleaseNotePart {
    type: 'intro';
    id: string;
    content: string;
}

export function isIntro(input: ReleaseNotePart): input is IntroPartModel {
    return (input as IntroPartModel).type === 'intro' && !!(input as IntroPartModel).id;
}

export interface AccordionPartModel extends ReleaseNotePart {
    type: 'accordion';
    content: string;
    title: string;
}

export function isAccordion(input: ReleaseNotePart): input is AccordionPartModel {
    return (input as AccordionPartModel).type === 'accordion'
        && !!input.content
        && !!input.title;
}

export interface GroupPartModel extends ReleaseNotePart {
    type: 'group';
    title: string;
    content_parts: ReleaseNotePart[];
}

export function isGroup(input: ReleaseNotePart): input is GroupPartModel {
    return (input as GroupPartModel).type === 'group'
        && !input.content
        && !!input.title;
}