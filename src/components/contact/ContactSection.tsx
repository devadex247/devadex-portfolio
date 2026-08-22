"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteConfig } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

const formSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

type ContactState = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [contactState, setContactState] = useState<ContactState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = siteConfig.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onSubmit = async (data: FormData) => {
    setContactState("sending");
    // Mailto fallback — real email integration would require a backend
    const subject = encodeURIComponent(`[Portfolio] Message from ${data.name}`);
    const body = encodeURIComponent(`From: ${data.name} <${data.email}>\n\n${data.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setContactState("success");
      reset();
    }, 800);
  };

  return (
    <section
      id="contact"
      className="section"
      aria-labelledby="contact-heading"
      style={{ background: "var(--surface)" }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left: heading + context */}
          <div>
            <SectionHeader
              eyebrow="$ contact --init"
              title="Have a problem worth building?"
              subtitle="I'm interested in AI engineering roles, software engineering opportunities, collaborations, and ambitious products."
            />

            {/* Terminal status */}
            <Reveal delay={0.1}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ color: "var(--text-secondary)", marginBottom: "6px" }}>
                  &gt; Establishing connection...
                </div>
                <div style={{ color: "var(--accent)", marginBottom: "12px" }}>
                  &gt; STATUS: READY
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  EMAIL:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    style={{ color: "var(--text-primary)" }}
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Copy email button */}
            <Reveal delay={0.15}>
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={spring}
                aria-label="Copy email address"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 20px",
                  border: copied ? "1px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "8px",
                  background: copied ? "var(--accent-subtle)" : "var(--bg)",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  color: copied ? "var(--accent)" : "var(--text-secondary)",
                  transition: "border-color 0.2s ease, color 0.2s ease, background 0.2s ease",
                  width: "100%",
                  maxWidth: "280px",
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={spring}
                    >
                      COPIED ✓
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={spring}
                    >
                      [ COPY EMAIL ]
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Reveal>

            {/* Socials */}
            <Reveal delay={0.2}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { label: "GitHub ↗", href: siteConfig.github },
                  { label: "LinkedIn ↗", href: siteConfig.linkedin },
                  { label: "X ↗", href: siteConfig.twitter },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--text-secondary)",
                      letterSpacing: "0.06em",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Form header */}
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--surface)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5625rem",
                    color: "var(--accent)",
                  }}
                >
                  $
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5625rem",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.08em",
                  }}
                >
                  send --message
                </span>
              </div>

              <AnimatePresence mode="wait">
                {contactState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={spring}
                    style={{
                      padding: "48px 24px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--accent)",
                        letterSpacing: "0.1em",
                        marginBottom: "12px",
                      }}
                    >
                      CONNECTION ESTABLISHED ✓
                    </div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Opening email client... your message is ready to send.
                    </p>
                    <button
                      onClick={() => setContactState("idle")}
                      style={{
                        marginTop: "20px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        color: "var(--accent)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "0.08em",
                      }}
                    >
                      SEND ANOTHER →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0",
                    }}
                    noValidate
                  >
                    {[
                      { name: "name" as const, label: "YOUR NAME", placeholder: "Adeola Smith", type: "text" },
                      { name: "email" as const, label: "YOUR EMAIL", placeholder: "adeola@example.com", type: "email" },
                    ].map((field) => (
                      <div
                        key={field.name}
                        style={{ borderBottom: "1px solid var(--border)", padding: "16px 20px" }}
                      >
                        <label
                          htmlFor={field.name}
                          style={{
                            display: "block",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.5625rem",
                            color: "var(--text-secondary)",
                            letterSpacing: "0.1em",
                            marginBottom: "6px",
                          }}
                        >
                          &gt; {field.label}
                        </label>
                        <input
                          id={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          {...register(field.name)}
                          style={{
                            width: "100%",
                            background: "none",
                            border: "none",
                            outline: "none",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.875rem",
                            color: "var(--text-primary)",
                          }}
                        />
                        {errors[field.name] && (
                          <p
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.5625rem",
                              color: "var(--status-red, #dc2626)",
                              marginTop: "4px",
                              letterSpacing: "0.06em",
                            }}
                          >
                            ERROR: {errors[field.name]?.message}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Message */}
                    <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 20px" }}>
                      <label
                        htmlFor="message"
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.5625rem",
                          color: "var(--text-secondary)",
                          letterSpacing: "0.1em",
                          marginBottom: "6px",
                        }}
                      >
                        &gt; MESSAGE
                      </label>
                      <textarea
                        id="message"
                        placeholder="I'd like to discuss..."
                        rows={4}
                        {...register("message")}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          outline: "none",
                          resize: "none",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                          lineHeight: 1.6,
                        }}
                      />
                      {errors.message && (
                        <p
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.5625rem",
                            color: "var(--status-red, #dc2626)",
                            marginTop: "4px",
                            letterSpacing: "0.06em",
                          }}
                        >
                          ERROR: {errors.message?.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <div style={{ padding: "16px 20px" }}>
                      <motion.button
                        type="submit"
                        disabled={contactState === "sending"}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={spring}
                        style={{
                          width: "100%",
                          padding: "12px",
                          background: "var(--text-primary)",
                          color: "var(--bg)",
                          border: "none",
                          borderRadius: "6px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          cursor: contactState === "sending" ? "wait" : "pointer",
                          opacity: contactState === "sending" ? 0.7 : 1,
                        }}
                      >
                        {contactState === "sending" ? "CONNECTING..." : "[ SEND MESSAGE ]"}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #contact .container > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
