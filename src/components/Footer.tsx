import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50" dir="rtl">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-gold flex items-center justify-center font-bold text-primary-foreground text-lg">D</div>
              <span className="text-lg font-bold">
                <span className="text-gradient-gold">Digi</span>
                <span className="text-foreground">Store</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              متجرك الموثوق للمنتجات الرقمية. دفع آمن وتوصيل فوري.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">روابط سريعة</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "المتجر", path: "/store" },
                { label: "الأقسام", path: "/categories" },
                { label: "العروض", path: "/flash-sales" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">الدعم</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "مركز المساعدة", path: "/support" },
                { label: "تواصل معنا", path: "/support" },
                { label: "الأسئلة الشائعة", path: "/support" },
                { label: "Discord", path: "/support" },
              ].map((item, i) => (
                <Link key={i} to={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">قانوني</h4>
            <nav className="flex flex-col gap-2">
              {["شروط الاستخدام", "سياسة الخصوصية", "سياسة الاسترجاع"].map((item) => (
                <Link key={item} to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 DigiStore. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">مدفوعات آمنة</span>
            <div className="flex gap-2">
              <div className="h-6 px-2 rounded bg-secondary text-[10px] font-mono text-muted-foreground flex items-center">STC</div>
              <div className="h-6 px-2 rounded bg-secondary text-[10px] font-mono text-muted-foreground flex items-center">بنكي</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
