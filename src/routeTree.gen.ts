/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SplatImport } from './routes/$'
import { Route as IndexImport } from './routes/index'
import { Route as ImagesIndexImport } from './routes/images.index'
import { Route as ImagesSplatImport } from './routes/images_.$'

// Create/Update Routes

const SplatRoute = SplatImport.update({
  id: '/$',
  path: '/$',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ImagesIndexRoute = ImagesIndexImport.update({
  id: '/images/',
  path: '/images/',
  getParentRoute: () => rootRoute,
} as any)

const ImagesSplatRoute = ImagesSplatImport.update({
  id: '/images_/$',
  path: '/images/$',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$': {
      id: '/$'
      path: '/$'
      fullPath: '/$'
      preLoaderRoute: typeof SplatImport
      parentRoute: typeof rootRoute
    }
    '/images_/$': {
      id: '/images_/$'
      path: '/images/$'
      fullPath: '/images/$'
      preLoaderRoute: typeof ImagesSplatImport
      parentRoute: typeof rootRoute
    }
    '/images/': {
      id: '/images/'
      path: '/images'
      fullPath: '/images'
      preLoaderRoute: typeof ImagesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$': typeof SplatRoute
  '/images/$': typeof ImagesSplatRoute
  '/images': typeof ImagesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$': typeof SplatRoute
  '/images/$': typeof ImagesSplatRoute
  '/images': typeof ImagesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$': typeof SplatRoute
  '/images_/$': typeof ImagesSplatRoute
  '/images/': typeof ImagesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/$' | '/images/$' | '/images'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/$' | '/images/$' | '/images'
  id: '__root__' | '/' | '/$' | '/images_/$' | '/images/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SplatRoute: typeof SplatRoute
  ImagesSplatRoute: typeof ImagesSplatRoute
  ImagesIndexRoute: typeof ImagesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SplatRoute: SplatRoute,
  ImagesSplatRoute: ImagesSplatRoute,
  ImagesIndexRoute: ImagesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$",
        "/images_/$",
        "/images/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$": {
      "filePath": "$.tsx"
    },
    "/images_/$": {
      "filePath": "images_.$.tsx"
    },
    "/images/": {
      "filePath": "images.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
