
import SideNav from '@/components/ui/sidenav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Sidebar - fixed width on desktop */}
      <div className=" flex-none bg-white border-r">
        <SideNav />
      </div>

      {/* Main content area - scrollable */}
      <div className="grow p-6 md:overflow-y-auto md:p-12 bg-gray-50">
        {children}
      </div>
    </div>
  );
}
