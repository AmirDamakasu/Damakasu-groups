import type { RefObject } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { Highlight } from "@/data/highlights";

type HighlightLightboxProps = {
  highlight: Highlight | null;
  onClose: () => void;
  /** Tile to refocus when the viewer closes (the dialog is opened programmatically, not by a Trigger). */
  returnFocusTo: RefObject<HTMLElement | null>;
};

/**
 * Full-screen photo viewer. Radix Dialog provides the focus trap, Esc / backdrop close and
 * returns focus to the tile that opened it.
 */
export function HighlightLightbox({ highlight, onClose, returnFocusTo }: HighlightLightboxProps) {
  const reduceMotion = useReducedMotion();

  return (
    <DialogPrimitive.Root open={Boolean(highlight?.image)} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          />
        </DialogPrimitive.Overlay>
        <DialogPrimitive.Content
          className="fixed inset-0 z-[61] flex flex-col items-center justify-center gap-4 p-4 outline-none sm:p-8"
          onCloseAutoFocus={(event) => {
            if (returnFocusTo.current) {
              event.preventDefault();
              returnFocusTo.current.focus();
            }
          }}
          onClick={(event) => {
            // Clicking the empty area around the photo closes the viewer.
            if (event.target === event.currentTarget) onClose();
          }}
        >
          {highlight?.image && (
            <>
              <motion.img
                src={highlight.image}
                alt={highlight.alt}
                className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="text-center">
                <DialogPrimitive.Title className="font-serif text-lg font-bold text-white sm:text-xl">
                  {highlight.caption}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1 text-sm text-white/70">
                  {highlight.category}
                </DialogPrimitive.Description>
              </div>
            </>
          )}
          <DialogPrimitive.Close
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
