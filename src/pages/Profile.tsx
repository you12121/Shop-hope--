import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Package, CreditCard, Clock, CheckCircle2, XCircle, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoreLayout from "@/components/StoreLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  status: string;
  total: number;
  payment_method: string;
  created_at: string;
  order_items: { id: string; price: number; quantity: number; delivery_status: string | null; product_id: string }[];
}

const statusMap: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "قيد المراجعة", color: "text-warning bg-warning/10", icon: Clock },
  approved: { label: "تمت الموافقة", color: "text-success bg-success/10", icon: CheckCircle2 },
  rejected: { label: "مرفوض", color: "text-destructive bg-destructive/10", icon: XCircle },
  delivered: { label: "تم التسليم", color: "text-primary bg-primary/10", icon: Package },
  refunded: { label: "مُسترجع", color: "text-muted-foreground bg-muted/50", icon: CreditCard },
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const fetchData = async () => {
      const [{ data: profileData }, { data: ordersData }] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      setProfile(profileData);
      setOrders((ordersData as Order[]) || []);
      setLoading(false);
    };
    fetchData();
  }, [user, navigate]);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <StoreLayout>
      <div className="container py-8 lg:py-12 max-w-4xl" dir="rtl">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
              <p className="text-muted-foreground mt-1">مرحباً {profile?.display_name || user.email}</p>
            </div>
            <Button variant="secondary" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "إجمالي الطلبات", value: orders.length, icon: Package },
              { label: "قيد المراجعة", value: orders.filter((o) => o.status === "pending").length, icon: Clock },
              { label: "تمت الموافقة", value: orders.filter((o) => o.status === "approved" || o.status === "delivered").length, icon: CheckCircle2 },
              { label: "إجمالي الإنفاق", value: `$${orders.reduce((s, o) => s + Number(o.total), 0).toFixed(2)}`, icon: CreditCard },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/60 bg-card p-4">
                <stat.icon className="h-5 w-5 text-primary mb-2" />
                <p className="text-xl font-bold text-foreground tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Profile info */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-xl border border-border/60 bg-card p-6 mb-8">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              معلومات الحساب
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">البريد الإلكتروني</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">الاسم</p>
                <p className="font-medium text-foreground">{profile?.display_name || "—"}</p>
              </div>
              {profile?.discord_username && (
                <div>
                  <p className="text-muted-foreground">Discord</p>
                  <p className="font-medium text-foreground">{profile.discord_username}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">تاريخ التسجيل</p>
                <p className="font-medium text-foreground">{new Date(user.created_at).toLocaleDateString("ar-SA")}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Orders */}
        <ScrollReveal delay={0.2}>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            سجل الطلبات
          </h2>
        </ScrollReveal>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border/60 bg-card p-5 animate-pulse">
                <div className="h-4 bg-secondary rounded w-1/3 mb-3" />
                <div className="h-3 bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <ScrollReveal delay={0.25}>
            <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-lg font-medium text-muted-foreground">لا توجد طلبات بعد</p>
              <Link to="/store">
                <Button variant="hero" className="mt-4">تصفح المتجر</Button>
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-3">
            {orders.map((order, i) => {
              const st = statusMap[order.status] || statusMap.pending;
              const StIcon = st.icon;
              return (
                <ScrollReveal key={order.id} delay={0.25 + i * 0.05}>
                  <div className="rounded-lg border border-border/60 bg-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-foreground">#{order.id.slice(0, 8)}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1 ${st.color}`}>
                          <StIcon className="h-3 w-3" />
                          {st.label}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {order.order_items.length} منتج •{" "}
                        {order.payment_method === "bank_transfer" ? "تحويل بنكي" : "STC Pay"}
                      </div>
                      <span className="font-bold text-foreground tabular-nums">${Number(order.total).toFixed(2)}</span>
                    </div>
                    {order.status === "delivered" && (
                      <div className="mt-3 p-3 rounded-md bg-success/5 border border-success/20">
                        <p className="text-xs text-success flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" />
                          تم تسليم المنتجات — تحقق من بريدك الإلكتروني
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </StoreLayout>
  );
};

export default Profile;
