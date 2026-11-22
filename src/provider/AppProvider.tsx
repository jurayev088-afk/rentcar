'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import UseMeContext from "../constants/UseMeContext";
const queryClient = new QueryClient()
export default function AppProvider({children}:{children:ReactNode}) {
  return(
    <QueryClientProvider client={queryClient}>
        <UseMeContext>
            {children}
        </UseMeContext>
    </QueryClientProvider>
  )
}
