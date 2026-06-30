import { lazy, Suspense, useEffect, useState } from 'react';

const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));

type WindowWithIdle = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function DeferredWhatsAppButton() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const browserWindow = window as WindowWithIdle;
    const reveal = () => setShouldRender(true);
    const timeoutId = window.setTimeout(reveal, 3200);
    const idleId = browserWindow.requestIdleCallback?.(reveal, { timeout: 2400 });

    window.addEventListener('scroll', reveal, { once: true, passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId !== undefined) browserWindow.cancelIdleCallback?.(idleId);
      window.removeEventListener('scroll', reveal);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <WhatsAppButton />
    </Suspense>
  );
}
