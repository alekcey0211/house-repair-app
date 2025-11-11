import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import { lazy } from 'react'
import Header from '../components/Header'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import TanStackRouterDevtools from '../integrations/tanstack-router/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { Footer } from '@/components/footer'

interface MyRouterContext {
  queryClient: QueryClient
}

const TanStackDevtools = lazy(() =>
  import('@tanstack/react-devtools').then((module) => ({
    default: module.TanStackDevtools,
  })),
)

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Планировщик ремонта',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body className="grid grid-rows-[auto_1fr_auto] min-h-screen supports-h-sdh:h-dvh">
        <Header />
        {children}
        <Footer />
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[TanStackRouterDevtools, TanStackQueryDevtools]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
