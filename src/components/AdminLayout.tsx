import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, Users, ShoppingBag, CreditCard,
  FileText, Settings, ChevronLeft, ChevronRight, LogOut,
  BarChart3, Shield
} from "lucide-react";

const sidebarLinks = [
  { label: "لوحة التحكم", icon: LayoutDashboard, path: "/admin" },
  { label: "المنتجات", icon: Package, path: "/admin/products" },
  { label: "الطلبات", icon: ShoppingBag, path: "/admin/orders" },
  { label: "المدفوعات", icon: CreditCard, path: "/admin/payments" },
  { label: "المستخدمون", icon: Users, path: "/admin/users" },
  { label: "التحليلات", icon: BarChart3, path: "/admin/analytics" },
  { label: "السجلات", icon: FileText, path: "/admin/logs" },
  { label: "الأمان", icon: Shield, path: "/admin/security" },
  { label: "الإعدادات", icon: Settings, path: "/admin/settings" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background" dir="rtl">
      <aside className={`${collapsed ? "w-16" : "w-60"} border-l border-border/50 bg-card/50 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-gradient-gold flex items-center justify-center font-bold text-primary-foreground text-sm">D</div>
              <span className="text-sm font-bold"><span className="text-gradient-gold">Digi</span><span className="text-foreground">Store</span></span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                title={collapsed ? link.label : undefined}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border/50">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>خروج من الإدارة</span>}
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
