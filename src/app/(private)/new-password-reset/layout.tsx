import { Provider } from "@/components/ui/provider"

export default function NewPasswordReset({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Provider>{children}</Provider>
  )
}