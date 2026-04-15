// components/ScrollReveal.tsx
"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollRevealProps {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  resetOnExit?: boolean;
}

export default function ScrollReveal({ 
  threshold = 0.12, 
  rootMargin = "0px 0px -40px 0px",
  once = false,
  resetOnExit = true
}: ScrollRevealProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element comes into view - add revealed class
            entry.target.classList.add("revealed");
            
            // Remove any exit animation classes if they exist
            entry.target.classList.remove("revealed-exit");
          } else if (resetOnExit) {
            // Element leaves view - remove revealed class for re-animation
            entry.target.classList.remove("revealed");
            
            // Optional: Add exit animation class
            entry.target.classList.add("revealed-exit");
            
            // Remove exit class after animation completes
            setTimeout(() => {
              entry.target.classList.remove("revealed-exit");
            }, 600);
          }
        });
      },
      { threshold, rootMargin }
    );

    // Get all elements with reveal classes
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, .reveal-fade, .reveal-rotate, .reveal-blur, .stagger-children"
    );

    revealElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Watch for dynamically added elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, .reveal-fade, .reveal-rotate, .reveal-blur, .stagger-children";
            
            if (element.matches?.(selectors)) {
              observerRef.current?.observe(element);
            }
            const children = element.querySelectorAll?.(selectors);
            children?.forEach((child) => {
              observerRef.current?.observe(child);
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin, resetOnExit]);

  return null;
}