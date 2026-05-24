import Sidebar from "../../components/layout/Sidebar"
import Navbar from "../../components/layout/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <main
  className="
    responsive-container
    flex
    min-h-screen
    bg-[var(--background)]
    text-[var(--foreground)]
  "
>

      <Sidebar />

      <div
  className="
    flex-1
    w-full
  "
>

       <div
  className="
    mx-auto
    w-full
    max-w-7xl

    p-3
    sm:p-4
    md:p-6
    lg:p-10

    space-y-6
    md:space-y-8

  "
>
          <Navbar />

          {children}

        </div>

      </div>

    </main>
  )
}