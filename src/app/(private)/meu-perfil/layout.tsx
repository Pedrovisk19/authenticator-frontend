import { Provider } from "@/components/ui/provider"

export default function MyProfile({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Provider>{children}</Provider>
  )
}