import { useParams, Link } from "react-router-dom";
import { Star, ShieldCheck, ShoppingCart, ArrowLeft, Zap, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoreLayout from "@/components/StoreLayout";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Product = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <StoreLayout>
        <div className="container py-20 text-center" dir="rtl">
          <h1 className="text-2xl font-bold text-foreground">المنتج غير موجود</h1>
          <Link to="/store"><Button variant="secondary" className="mt-4">العودة للمتجر</Button></Link>
        </div>
      </StoreLayout>
    );
  }

  const related = mockProducts.filter((p) => p.id !== id && p.category === product.category).slice(0, 3);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const typeLabels: Record<string, string> = { account: "حساب", subscription: "اشتراك", license: "مفتاح تفعيل" };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr || product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      type: product.type,
    });
    toast.success("تمت الإضافة إلى السلة!");
  };

  return (
    <StoreLayout>
      <div className="container py-8 lg:py-12" dir="rtl">
        <ScrollReveal>
          <Link to="/store" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 rotate-180" /> العودة للمتجر
          </Link>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10">
          <ScrollReveal direction="left">
            <div className="aspect-square rounded-xl border border-border/60 bg-card flex items-center justify-center relative overflow-hidden">
              <div className="text-8xl font-bold text-muted-foreground/10">{product.name.charAt(0)}</div>
              {product.flash && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-md bg-gradient-gold text-primary-foreground text-xs font-bold">
                  <Zap className="h-3 w-3" /> عرض خاص
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-primary uppercase tracking-wider">{product.categoryAr || product.category}</p>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 leading-tight">{product.nameAr || product.name}</h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} تقييم)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground tabular-nums">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through tabular-nums">${product.originalPrice.toFixed(2)}</span>
                    <span className="text-sm font-semibold text-destructive">-{discount}%</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded bg-secondary text-secondary-foreground font-medium">{typeLabels[product.type]}</span>
                {product.inStock ? (
                  <span className="text-xs text-success font-medium flex items-center gap-1"><Package className="h-3 w-3" /> متوفر</span>
                ) : (
                  <span className="text-xs text-destructive font-medium">غير متوفر</span>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                احصل على وصول فوري بعد التحقق من الدفع. يتم التسليم مباشرة إلى لوحة تحكمك وبريدك الإلكتروني. جميع المنتجات مع ضمان الاستبدال.
              </p>

              <div className="flex gap-3 pt-2">
                <Button variant="hero" size="xl" className="flex-1" disabled={!product.inStock} onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4" /> أضف للسلة
                </Button>
                <Link to="/checkout">
                  <Button variant="hero-outline" size="xl" disabled={!product.inStock} onClick={handleAddToCart}>
                    اشتري الآن
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 pt-3 border-t border-border/50">
                {[
                  { icon: ShieldCheck, text: "دفع آمن" },
                  { icon: Zap, text: "توصيل فوري" },
                  { icon: Package, text: "ضمان الاستبدال" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="h-3.5 w-3.5 text-primary" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <ScrollReveal>
              <h2 className="text-xl font-bold text-foreground mb-6">منتجات مشابهة</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.08}>
                  <ProductCard {...p} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </StoreLayout>
  );
};

export default Product;
