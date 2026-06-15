"use client";

import { useState } from "react";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import { formatPrice, resumePackages } from "@/lib/data";

export default function ResumeServicesPage() {
  const [selectedId, setSelectedId] = useState(resumePackages.find((p) => p.popular)?.id ?? resumePackages[0].id);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  const selected = resumePackages.find((p) => p.id === selectedId)!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold">Resume Services</h1>
        <p className="mt-3 text-lg text-muted">
          Professional, ATS-friendly resumes delivered in PDF and Word formats.
          Choose a package and we&apos;ll craft your perfect resume.
        </p>
      </div>

      {/* Packages */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {resumePackages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedId(pkg.id)}
            className={`glass-card relative rounded-2xl p-6 text-left transition-all ${
              selectedId === pkg.id
                ? "border-primary ring-2 ring-primary/30"
                : "hover:border-primary/30"
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-semibold">{pkg.name}</h3>
            <p className="mt-2 text-sm text-muted">{pkg.description}</p>
            <p className="mt-4 text-2xl font-bold">{formatPrice(pkg.price)}</p>
            <div className="mt-3 flex gap-2">
              {pkg.formats.map((fmt) => (
                <span key={fmt} className="rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-accent">
                  {fmt}
                </span>
              ))}
            </div>
            <ul className="mt-4 space-y-2">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-accent">✓</span> {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Order Form */}
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Your Details</h2>
          <p className="mt-1 text-sm text-muted">
            Fill in your information so we can deliver your resume in {selected.formats.join(" & ")} format.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="john@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted">Additional Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="mt-1 w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="Target role, years of experience, special requirements..."
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Package</span>
              <span className="font-medium">{selected.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Formats</span>
              <span className="font-medium">{selected.formats.join(" + ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Delivery</span>
              <span className="font-medium">{selected.deliveryDays} business days</span>
            </div>
            <div className="flex justify-between border-t border-card-border pt-3 text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(selected.price)}</span>
            </div>
          </div>

          <div className="mt-6">
            <RazorpayCheckout
              amount={selected.price}
              productName={selected.name}
              productDescription={`Resume Service: ${selected.name} (${selected.formats.join(" & ")})`}
              buttonLabel={`Pay ${formatPrice(selected.price)}`}
              customerName={form.name}
              customerEmail={form.email}
              customerPhone={form.phone}
            />
          </div>

          <p className="mt-4 text-center text-xs text-muted">
            After payment, our team will contact you within 24 hours to collect your career details.
          </p>
        </div>
      </div>
    </div>
  );
}
