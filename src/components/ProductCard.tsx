import { Link } from "react-router-dom";
import { Star, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export interface ProductCardProps {
  id: string;
  name: string;
  nameAr?: string;
  category: string;
  categoryAr?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  type: "account" | "subscription" | "license";
  inStock: boolean;
  image?: string;
  flash?: boolean;
}

const typeLabels: Record<string, string> = {
  account: "حساب",
  subscription: "اشتراك",
  license: "مفتاح تفعيل",
};

const ProductCard = ({
  id,
  name,
  nameAr,
  category,
  categoryAr,
  price,
  originalPrice,
  rating,
  reviews,
  type,
  inStock,
  flash,
}: ProductCardProps) => {
  const { addItem } = useCart();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link
      to={`/product/${id}`}
      className="group block rounded-lg border border-border/60 bg-card overflow-hidden card-hover relative"
      dir="rtl"
    >
      <div className="relative aspect-[4/3] bg-secondary/50 flex items-center justify-center overflow-hidden">
        <div className="text-4xl font-bold text-muted-foreground/20 group-hover:scale-110 transition-transform duration-500">
          {name.charAt(0)}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
            {typeLabels[type]}
          </span>
          {flash && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-gold text-primary-foreground flex items-center gap-1">
              <Zap className="h-3 w-3" /> عرض
            </span>
          )}
        </div>
        {discount > 0 && (
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded bg-destructive text-destructive-foreground">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{categoryAr || category}</p>
        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {nameAr || name}
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground tabular-nums">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through tabular-nums">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!inStock) { toast.error("المنتج غير متوفر حالياً"); return; }
              addItem({ id, name, nameAr: nameAr || name, price, originalPrice, category, type, image: undefined });
              toast.success("تمت الإضافة إلى السلة");
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        {!inStock && <p className="text-[11px] font-medium text-destructive">غير متوفر</p>}
      </div>
    </Link>
  );
};

export default ProductCard;
