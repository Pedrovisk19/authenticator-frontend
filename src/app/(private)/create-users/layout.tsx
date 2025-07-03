import { Provider } from "@/components/ui/provider"

export default function CreateUsers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Provider>{children}</Provider>
  )
}