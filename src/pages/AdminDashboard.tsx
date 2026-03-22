import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { label: "الإيرادات", value: "$12,847", change: "+14.2%", up: true, icon: DollarSign },
  { label: "الطلبات", value: "384", change: "+8.1%", up: true, icon: ShoppingBag },
  { label: "العملاء", value: "1,247", change: "+23.5%", up: true, icon: Users },
  { label: "التحويل", value: "3.2%", change: "-0.4%", up: false, icon: TrendingUp },
];

const recentOrders = [
  { id: "ORD-7291", customer: "أحمد خ.", product: "نتفلكس بريميوم", amount: "$29.99", status: "تمت الموافقة", date: "قبل دقيقتين" },
  { id: "ORD-7290", customer: "سارة م.", product: "ويندوز 11 برو", amount: "$24.99", status: "قيد المراجعة", date: "قبل 15 دقيقة" },
  { id: "ORD-7289", customer: "عمر ف.", product: "سبوتيفاي بريميوم", amount: "$14.99", status: "تمت الموافقة", date: "قبل ساعة" },
  { id: "ORD-7288", customer: "لينا ر.", product: "أدوبي CC", amount: "$49.99", status: "مرفوض", date: "قبل ساعتين" },
  { id: "ORD-7287", customer: "خالد أ.", product: "أوفيس 365", amount: "$39.99", status: "تمت الموافقة", date: "قبل 3 ساعات" },
];

const statusColors: Record<string, string> = {
  "تمت الموافقة": "text-success bg-success/10",
  "قيد المراجعة": "text-warning bg-warning/10",
  "مرفوض": "text-destructive bg-destructive/10",
};

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div dir="rtl">
        <ScrollReveal>
          <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="text-muted-foreground text-sm mt-1">نظرة عامة على أداء المتجر</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="rounded-lg border border-border/60 bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mt-2 tabular-nums">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change} عن الشهر الماضي
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div className="p-5 border-b border-border/50">
              <h2 className="font-semibold text-foreground">آخر الطلبات</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">الطلب</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">العميل</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">المنتج</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">المبلغ</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">الحالة</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">الوقت</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-mono text-foreground">{order.id}</td>
                      <td className="px-5 py-3.5 text-sm text-foreground">{order.customer}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{order.product}</td>
                      <td className="px-5 py-3.5 text-sm font-medium text-foreground tabular-nums">{order.amount}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${statusColors[order.status]}`}>{order.status}</span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
