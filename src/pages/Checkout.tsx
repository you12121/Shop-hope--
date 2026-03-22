import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Building2, Smartphone, CreditCard, CheckCircle2, ArrowLeft } from "lucide-react";
import StoreLayout from "@/components/StoreLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type PaymentMethod = "bank_transfer" | "stc_pay";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>("bank_transfer");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    return (
      <StoreLayout>
        <div className="container py-20 text-center" dir="rtl">
          <h1 className="text-2xl font-bold text-foreground">يرجى تسجيل الدخول أولاً</h1>
          <p className="text-muted-foreground mt-2">تحتاج إلى حساب لإتمام عملية الشراء</p>
          <Link to="/login">
            <Button variant="hero" className="mt-6">تسجيل الدخول</Button>
          </Link>
        </div>
      </StoreLayout>
    );
  }

  if (items.length === 0 && !submitted) {
    return (
      <StoreLayout>
        <div className="container py-20 text-center" dir="rtl">
          <h1 className="text-2xl font-bold text-foreground">السلة فارغة</h1>
          <Link to="/store">
            <Button variant="hero" className="mt-6">تصفح المتجر</Button>
          </Link>
        </div>
      </StoreLayout>
    );
  }

  if (submitted) {
    return (
      <StoreLayout>
        <div className="container py-20 text-center max-w-md mx-auto" dir="rtl">
          <ScrollReveal>
            <div className="rounded-xl border border-success/30 bg-success/5 p-8">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground">تم إرسال طلبك بنجاح!</h1>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                سنراجع إثبات الدفع خلال دقائق. ستصلك المنتجات فور الموافقة على لوحة التحكم والبريد الإلكتروني.
              </p>
              <div className="flex gap-3 mt-6 justify-center">
                <Link to="/profile">
                  <Button variant="hero">طلباتي</Button>
                </Link>
                <Link to="/store">
                  <Button variant="secondary">تصفح المزيد</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </StoreLayout>
    );
  }

  const handleSubmit = async () => {
    if (!proofFile) {
      toast.error("يرجى رفع إثبات الدفع");
      return;
    }

    setUploading(true);
    try {
      // Upload proof
      const ext = proofFile.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("payment-proofs")
        .upload(filePath, proofFile);
      if (uploadErr) throw uploadErr;

      // Create order
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total,
          payment_method: method,
          payment_proof_url: filePath,
          status: "pending",
        })
        .select()
        .single();
      if (orderErr) throw orderErr;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) throw itemsErr;

      // Create payment record
      const { error: payErr } = await supabase.from("payments").insert({
        order_id: order.id,
        user_id: user.id,
        amount: total,
        method,
        status: "pending",
        proof_url: filePath,
      });
      if (payErr) throw payErr;

      clearCart();
      setSubmitted(true);
      toast.success("تم إرسال الطلب بنجاح!");
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ أثناء إرسال الطلب");
    } finally {
      setUploading(false);
    }
  };

  return (
    <StoreLayout>
      <div className="container py-8 lg:py-12 max-w-3xl" dir="rtl">
        <ScrollReveal>
          <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 rotate-180" /> العودة للسلة
          </Link>
          <h1 className="text-3xl font-bold text-foreground">إتمام الطلب</h1>
          <p className="text-muted-foreground mt-1">اختر طريقة الدفع وارفع إثبات التحويل</p>
        </ScrollReveal>

        <div className="mt-8 space-y-6">
          {/* Order summary */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="font-semibold text-foreground mb-4">ملخص الطلب</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.nameAr || item.name} × {item.quantity}</span>
                    <span className="tabular-nums text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border/50 pt-3 flex justify-between font-bold text-foreground">
                  <span>المجموع</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Payment method */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="font-semibold text-foreground mb-4">طريقة الدفع</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setMethod("bank_transfer")}
                  className={`p-4 rounded-lg border-2 text-right transition-all ${
                    method === "bank_transfer"
                      ? "border-primary bg-primary/5"
                      : "border-border/60 hover:border-border"
                  }`}
                >
                  <Building2 className={`h-6 w-6 mb-2 ${method === "bank_transfer" ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold text-foreground text-sm">تحويل بنكي</p>
                  <p className="text-xs text-muted-foreground mt-0.5">بنك الراجحي</p>
                </button>
                <button
                  onClick={() => setMethod("stc_pay")}
                  className={`p-4 rounded-lg border-2 text-right transition-all ${
                    method === "stc_pay"
                      ? "border-primary bg-primary/5"
                      : "border-border/60 hover:border-border"
                  }`}
                >
                  <Smartphone className={`h-6 w-6 mb-2 ${method === "stc_pay" ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold text-foreground text-sm">STC Pay</p>
                  <p className="text-xs text-muted-foreground mt-0.5">دفع سريع</p>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Payment details */}
          <ScrollReveal delay={0.3}>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              {method === "bank_transfer" ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    بيانات التحويل البنكي
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">البنك</p>
                      <p className="font-medium text-foreground">بنك الراجحي</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">اسم المستفيد</p>
                      <p className="font-medium text-foreground">DigiStore LLC</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">رقم الآيبان (IBAN)</p>
                      <p className="font-mono font-medium text-foreground text-base tracking-wide select-all">
                        SA03 8000 0000 6080 1016 7519
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    قم بالتحويل إلى الآيبان أعلاه ثم ارفع صورة إيصال التحويل
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    بيانات STC Pay
                  </h3>
                  <div className="text-sm">
                    <p className="text-muted-foreground">رقم الجوال</p>
                    <p className="font-mono font-medium text-foreground text-lg tracking-wide select-all">
                      05XX XXX XXXX
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    حوّل المبلغ عبر STC Pay ثم ارفع صورة الإيصال
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Upload proof */}
          <ScrollReveal delay={0.4}>
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                رفع إثبات الدفع
              </h2>
              <label className="block cursor-pointer">
                <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  proofFile ? "border-success bg-success/5" : "border-border/60 hover:border-primary/50"
                }`}>
                  {proofFile ? (
                    <div>
                      <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">{proofFile.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">اضغط لتغيير الملف</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">اضغط هنا لرفع صورة إيصال الدفع</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF — حتى 10MB</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </ScrollReveal>

          {/* Submit */}
          <ScrollReveal delay={0.5}>
            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={handleSubmit}
              disabled={uploading || !proofFile}
            >
              {uploading ? "جاري الإرسال..." : "تأكيد الطلب"}
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              سيتم مراجعة إثبات الدفع وإرسال المنتجات خلال دقائق
            </p>
          </ScrollReveal>
        </div>
      </div>
    </StoreLayout>
  );
};

export default Checkout;
