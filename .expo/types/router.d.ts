/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/components/InputMessage`; params?: Router.UnknownInputParams; } | { pathname: `/components/Message`; params?: Router.UnknownInputParams; } | { pathname: `/utils/types`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/components/InputMessage`; params?: Router.UnknownOutputParams; } | { pathname: `/components/Message`; params?: Router.UnknownOutputParams; } | { pathname: `/utils/types`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/components/InputMessage${`?${string}` | `#${string}` | ''}` | `/components/Message${`?${string}` | `#${string}` | ''}` | `/utils/types${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/components/InputMessage`; params?: Router.UnknownInputParams; } | { pathname: `/components/Message`; params?: Router.UnknownInputParams; } | { pathname: `/utils/types`; params?: Router.UnknownInputParams; };
    }
  }
}
