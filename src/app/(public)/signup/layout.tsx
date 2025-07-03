import { Provider } from "@/components/ui/provider"

export default function SignUp({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Provider>{children}</Provider>
  )
}