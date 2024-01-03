import { Navigation } from "./ui/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}