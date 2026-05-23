import Sidebar from "../../components/layout/Sidebar"
import Navbar from "../../components/layout/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      <Sidebar />

      <div className="flex-1 overflow-hidden">

        <div className="mx-auto max-w-7xl p-6 lg:p-10 space-y-8">

          <Navbar />

          {children}

        </div>

      </div>

    </main>
  )
}