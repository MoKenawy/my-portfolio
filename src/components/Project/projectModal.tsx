"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import React from "react";

// Uses the Radix Dialog primitive (the same one shadcn's Dialog wraps) for
// focus trap, Escape, and scroll lock; styled directly against Manuscript
// tokens. When shadcn's CLI is adopted later, this slots in as its Dialog.
interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: string;
  overview: string;
  tools?: string[];
  images?: string[];
  links?: { name: string; url: string }[];
}

export default function ProjectModal({
  open,
  onOpenChange,
  trigger,
  title,
  overview,
  tools = [],
  images = [],
  links = [],
}: ProjectModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-hairline bg-ground p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <Dialog.Title className="font-serif text-3xl leading-tight">
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="mono shrink-0 border border-hairline px-3 py-1 text-mid transition-colors hover:border-paper hover:text-paper"
            >
              Close
            </Dialog.Close>
          </div>

          <hr className="flourish mt-4" />

          <Dialog.Description asChild>
            <p className="prose-measure mt-6 font-serif text-lg text-paper">
              {overview}
            </p>
          </Dialog.Description>

          {tools.length > 0 && (
            <section className="mt-8">
              <span className="mono block">Stack</span>
              <p className="mt-2 font-mono text-sm leading-relaxed text-paper">
                {tools.join("  ·  ")}
              </p>
            </section>
          )}

          {images.length > 0 && (
            <section className="mt-8">
              <span className="mono block">Figures</span>
              <div className="mt-3 flex flex-wrap gap-4">
                {images.map((src) => (
                  <span
                    key={src}
                    className="border border-hairline p-1.5"
                  >
                    <Image
                      src={`/${src}`}
                      alt={`${title} — screenshot`}
                      width={220}
                      height={160}
                      className="h-40 w-auto object-cover"
                    />
                  </span>
                ))}
              </div>
            </section>
          )}

          {links.length > 0 && (
            <section className="mt-8">
              <span className="mono block">Links</span>
              <div className="mt-3 flex flex-wrap gap-4">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono border border-hairline px-3 py-2 text-mid transition-colors hover:border-paper hover:text-paper"
                  >
                    {link.name} ↗
                  </a>
                ))}
              </div>
            </section>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
