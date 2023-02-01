import { AppOptions, RoutingStrategy } from '../models';

const DEFAULT_OPTIONS = { 
  archiveUrl: '',
  showHeader: true,
  routingStrategy: "hash" as RoutingStrategy,
  defaultToArchive: false,
  setPageTitle: false
};

export const getOptions = (ele: HTMLElement | null): AppOptions => {
  try {
    if (!ele) {
      throw Error;
    }
    const options = ele.getAttribute('data-release-note-options');
    if (!options) {
      throw Error;
    }
    return {
      ...DEFAULT_OPTIONS,
      ...JSON.parse(options)
    };
  } catch (_) {
    return DEFAULT_OPTIONS;
  }
}