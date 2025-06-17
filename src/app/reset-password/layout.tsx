import { Provider } from "@/components/ui/provider"

export default function ResetPassword({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Provider>{children}</Provider>
  )
}