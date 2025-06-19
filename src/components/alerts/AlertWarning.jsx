import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function AlertWarning({ children }) {
  return (
    <Alert dir="rtl" className="rounded-xl border-yellow-500 text-yellow-800 bg-yellow-50">
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-6 text-yellow-700" />
        <AlertDescription className="text-bold text-lg">{children}</AlertDescription>
      </div>
    </Alert>
  );
}