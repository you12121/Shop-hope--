import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StoreLayout from "@/components/StoreLayout";
import ScrollReveal from "@/components/ScrollReveal";
import { MessageSquare, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How does delivery work?", a: "After your payment is verified, your product credentials are delivered instantly to your dashboard, email, and optionally via Discord DM." },
  { q: "What payment methods do you accept?", a: "We accept Bank Transfer (Al Rajhi Bank), STC Pay, and more coming soon. Upload your payment proof and we'll verify it within minutes." },
  { q: "What if my product doesn't work?", a: "All products come with a replacement guarantee. Open a support ticket and we'll resolve it within 24 hours." },
  { q: "Can I get a refund?", a: "Due to the digital nature of our products, refunds are handled on a case-by-case basis. Contact support for assistance." },
];

const Support = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <StoreLayout>
      <div className="container py-12 max-w-3xl">
        <ScrollReveal>
          <h1 className="text-3xl font-bold text-foreground text-center">Support Center</h1>
          <p className="text-muted-foreground text-center mt-2">How can we help you today?</p>
        </ScrollReveal>

        {/* Actions */}
        <ScrollReveal delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            <div className="rounded-lg border border-border/60 bg-card p-6 text-center card-hover">
              <MessageSquare className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground mt-3">Open a Ticket</h3>
              <p className="text-sm text-muted-foreground mt-1">Get help from our support team</p>
              <Button variant="hero" size="sm" className="mt-4">Create Ticket</Button>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-6 text-center card-hover">
              <svg className="h-8 w-8 mx-auto text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.36-.698.772-1.362 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.12-.094.246-.194.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              <h3 className="font-semibold text-foreground mt-3">Join Discord</h3>
              <p className="text-sm text-muted-foreground mt-1">Chat with the community</p>
              <Button variant="hero-outline" size="sm" className="mt-4">Join Server</Button>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border/60 bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-foreground hover:bg-secondary/30 transition-colors"
                  >
                    {faq.q}
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </StoreLayout>
  );
};

export default Support;
