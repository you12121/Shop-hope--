import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Clock, ArrowRight, ChevronLeft } from "lucide-react";
import StoreLayout from "@/components/StoreLayout";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { mockProducts, categories } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const flashProducts = mockProducts.filter((p) => p.flash);
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <StoreLayout>
      {/* Hero */}
      <section className="relative overflow-hidden" dir="rtl">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

        <div className="container relative py-24 lg:py-32">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6">
              <Zap className="h-3 w-3" />
              عروض خاصة — خصم يصل إلى 70%
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] max-w-2xl">
              منتجات رقمية,{" "}
              <span className="text-gradient-gold">توصيل فوري</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg leading-relaxed">
              حسابات بريميوم، اشتراكات، ومفاتيح تفعيل — تُسلّم بأمان إلى لوحة تحكمك خلال ثوانٍ.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/store">
                <Button variant="hero" size="xl">
                  تصفح المتجر
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </Button>
              </Link>
              <Link to="/flash-sales">
                <Button variant="hero-outline" size="xl">العروض الخاصة</Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-14 grid grid-cols-3 max-w-md gap-8">
              {[
                { value: "+12K", label: "منتج تم بيعه" },
                { value: "4.9★", label: "متوسط التقييم" },
                { value: "<30ث", label: "سرعة التوصيل" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Bar */}
      <ScrollReveal>
        <section className="border-y border-border/50 bg-card/30" dir="rtl">
          <div className="container py-6 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: ShieldCheck, text: "مدفوعات آمنة" },
              { icon: Zap, text: "توصيل فوري" },
              { icon: Clock, text: "دعم على مدار الساعة" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                {text}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Categories */}
      <section className="container py-16 lg:py-20" dir="rtl">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">تصفح الأقسام</h2>
              <p className="text-sm text-muted-foreground mt-1">اعثر على ما تحتاجه بالضبط</p>
            </div>
            <Link to="/categories" className="text-sm text-primary hover:underline flex items-center gap-1">
              عرض الكل <ChevronLeft className="h-3 w-3" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.07}>
              <Link
                to={`/store?category=${cat.name.toLowerCase()}`}
                className="group block rounded-lg border border-border/60 bg-card p-4 text-center card-hover"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{cat.nameAr}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{cat.count} منتج</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Flash Sales */}
      {flashProducts.length > 0 && (
        <section className="bg-card/30 border-y border-border/50" dir="rtl">
          <div className="container py-16 lg:py-20">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">عروض خاصة</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">عروض محدودة — اغتنم الفرصة</p>
                  </div>
                </div>
                <Link to="/flash-sales" className="text-sm text-primary hover:underline flex items-center gap-1">
                  عرض الكل <ChevronLeft className="h-3 w-3" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashProducts.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.08}>
                  <ProductCard {...product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="container py-16 lg:py-20" dir="rtl">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">منتجات مميزة</h2>
              <p className="text-sm text-muted-foreground mt-1">الأكثر مبيعاً هذا الأسبوع</p>
            </div>
            <Link to="/store" className="text-sm text-primary hover:underline flex items-center gap-1">
              عرض الكل <ChevronLeft className="h-3 w-3" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.08}>
              <ProductCard {...product} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="container pb-20" dir="rtl">
          <div className="relative rounded-xl border border-primary/20 bg-card overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">انضم لمجتمعنا على Discord</h2>
                <p className="text-muted-foreground mt-1">احصل على عروض حصرية ودعم فوري وكن أول من يعرف عن المنتجات الجديدة.</p>
              </div>
              <Button variant="hero" size="xl" className="shrink-0">
                انضم الآن
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </StoreLayout>
  );
};

export default Index;
