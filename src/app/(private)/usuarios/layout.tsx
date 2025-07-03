import { Provider } from "@/components/ui/provider"

export default function Users({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Provider>{children}</Provider>
  )
}