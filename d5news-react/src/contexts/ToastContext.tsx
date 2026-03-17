import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  visible: boolean;
}

interface ToastContextType {
  show: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const TOAST_COLORS: Record<ToastType, string> = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
};

const TOAST_ICONS: Record<ToastType, string> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
};

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastIdCounter;

    setToasts((prev) => [...prev, { id, message, type, visible: true }]);

    // Start exit animation after 2.6s, then remove at 3s
    const exitTimer = setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
    }, 2600);

    const removeTimer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      timersRef.current.delete(id);
    }, 3000);

    timersRef.current.set(id, exitTimer);
    timersRef.current.set(id + 0.5, removeTimer);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              ${TOAST_COLORS[toast.type]}
              text-white px-5 py-3 rounded-xl shadow-2xl
              flex items-center gap-3 min-w-[300px] max-w-[420px]
              pointer-events-auto
              transition-all duration-300 ease-out
              ${toast.visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
              }
            `}
            style={{
              animation: toast.visible ? 'toastEnter 0.3s ease-out' : undefined,
            }}
          >
            <span className="material-symbols-outlined text-xl shrink-0">
              {TOAST_ICONS[toast.type]}
            </span>
            <span className="text-sm font-medium leading-snug">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Inline keyframes for toast animation */}
      <style>{`
        @keyframes toastEnter {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
