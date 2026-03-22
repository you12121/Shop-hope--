import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StoreLayout from "@/components/StoreLayout";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { mockProducts, categories } from "@/data/mockData";

const Store = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filtered = mockProducts.filter((p) => {
    const matchSearch = (p.nameAr || p.name).includes(search) || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchType = !selectedType || p.type === selectedType;
    return matchSearch && matchCat && matchType;
  });

  return (
    <StoreLayout>
      <div className="container py-8 lg:py-12" dir="rtl">
        <ScrollReveal>
          <h1 className="text-3xl font-bold text-foreground">المتجر</h1>
          <p className="text-muted-foreground mt-1">تصفح جميع المنتجات</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="ابحث عن منتج..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9 bg-card border-border/60" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant={selectedCategory === null ? "default" : "secondary"} size="sm" onClick={() => setSelectedCategory(null)}>الكل</Button>
              {categories.slice(0, 4).map((cat) => (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                >
                  {cat.icon} {cat.nameAr}
                </Button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-3 flex gap-2">
            {([["account", "حسابات"], ["subscription", "اشتراكات"], ["license", "مفاتيح تفعيل"]] as const).map(([t, label]) => (
              <button
                key={t}
                onClick={() => setSelectedType(selectedType === t ? null : t)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedType === t
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-card border border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} منتج</p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.05}>
                  <ProductCard {...product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg font-medium text-muted-foreground">لا توجد منتجات</p>
              <p className="text-sm text-muted-foreground mt-1">جرّب تعديل الفلاتر</p>
              <Button variant="secondary" className="mt-4" onClick={() => { setSearch(""); setSelectedCategory(null); setSelectedType(null); }}>
                مسح الفلاتر
              </Button>
            </div>
          )}
        </div>
      </div>
    </StoreLayout>
  );
};

export default Store;
