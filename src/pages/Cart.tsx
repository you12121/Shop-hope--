import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StoreLayout from "@/components/StoreLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <StoreLayout>
        <div className="container py-20 text-center" dir="rtl">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">السلة فارغة</h1>
          <p className="text-muted-foreground mt-2">لم تضف أي منتجات بعد</p>
          <Link to="/store">
            <Button variant="hero" className="mt-6">تصفح المتجر</Button>
          </Link>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="container py-8 lg:py-12 max-w-4xl" dir="rtl">
        <ScrollReveal>
          <Link to="/store" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 rotate-180" /> متابعة التسوق
          </Link>
          <h1 className="text-3xl font-bold text-foreground">سلة المشتريات</h1>
          <p className="text-muted-foreground mt-1">{itemCount} منتج</p>
        </ScrollReveal>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.08}>
                <div className="flex gap-4 rounded-lg border border-border/60 bg-card p-4">
                  <div className="h-16 w-16 rounded-md bg-secondary/50 flex items-center justify-center shrink-0 text-xl font-bold text-muted-foreground/30">
                    {item.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                      {item.nameAr || item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 rounded border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium tabular-nums w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 rounded border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground tabular-nums">${(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="rounded-lg border border-border/60 bg-card p-6 space-y-4 h-fit sticky top-20">
              <h3 className="font-semibold text-foreground">ملخص الطلب</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>المجموع الفرعي</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
                <div className="border-t border-border/50 pt-2 flex justify-between font-semibold text-foreground">
                  <span>المجموع</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <input type="text" placeholder="كود الخصم" className="flex-1 h-9 px-3 rounded-md border border-border/60 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" dir="ltr" />
                <Button variant="secondary" size="sm">تطبيق</Button>
              </div>

              <Link to="/checkout">
                <Button variant="hero" size="xl" className="w-full">
                  <ShoppingBag className="h-4 w-4" />
                  إتمام الشراء
                </Button>
              </Link>

              <p className="text-[11px] text-muted-foreground text-center">دفع آمن • توصيل فوري</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </StoreLayout>
  );
};

export default Cart;
