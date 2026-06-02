
import SideNav from '@/components/ui/sidenav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-secondary text-foreground">
      {/* Sidebar - fixed width on desktop */}
      <div className=" flex-none border-r">
        <SideNav />
      </div>

      {/* Main content area - scrollable */}
      <div className="grow md:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
