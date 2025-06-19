import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AlertError({ children }) {
  return (
    <Alert dir="rtl" className="rounded-xl border-red-600 text-red-800 bg-red-50">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertDescription>{children}</AlertDescription>
      </div>
    </Alert>
  );
}
