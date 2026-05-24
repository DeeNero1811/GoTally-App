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
        flex
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      <Sidebar />

      <div
        className="
          flex-1
          min-w-0
          w-full
          overflow-x-hidden
        "
      >
        <div
          className="
            w-full
            max-w-full

            p-2
            sm:p-3
            md:p-4
            lg:p-6

            space-y-4
            md:space-y-6

            overflow-x-hidden
          "
        >
          <Navbar />

          <div className="min-w-0 overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}