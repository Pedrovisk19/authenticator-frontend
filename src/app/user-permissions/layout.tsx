import { Provider } from "@/components/ui/provider"

export default function UserPermissions({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Provider>{children}</Provider>
  )
}