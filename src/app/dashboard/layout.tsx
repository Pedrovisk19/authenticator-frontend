import { Provider } from "@/components/ui/provider"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Provider>{children}</Provider>
  )
}