// app/providers.tsx

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import AuthInterceptor from "./AuthInterceptor";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthInterceptor />
        <NextThemesProvider attribute="class" defaultTheme="light">
      {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}