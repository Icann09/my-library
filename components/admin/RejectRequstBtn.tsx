"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { rejectAccountRequest } from "@/lib/admin/actions/user";
import { useRouter } from "next/navigation";

export default function RejectRequestBtn({ userId }: { userId: string }) {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await rejectAccountRequest(userId);
      if (res.success) {
        toast.success("Request denied and student has been notified.");
        router.refresh();
        setModalOpen(false);
      } else {
        toast.error("Failed to deny account.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="bg-transparent cursor-pointer transition-transform duration-200 hover:scale-120">
        <p className="w-4 h-4 rounded-full border-red-500 border-2 flex justify-center items-center text-red-500">×</p>
      </button>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="text-center px-8 py-6 max-w-md">
          <DialogHeader>
            <div 
              style={{ backgroundColor: '#F46F70' }}
              className="mx-auto mb-4 rounded-full w-20 h-20 flex items-center justify-center">
              <AlertCircle className="text-white w-8 h-8" />
            </div>
            <DialogTitle className="text-xl flex justify-center font-bold">Deny Account Request</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-6">
            Denying this request will not notify the student they're not eligible due to unsuccessful ID card verification
          </p>
          <Button
            className="text-white px-4 py-2 rounded-md"
            style={{ backgroundColor: '#F46F70' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05151')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F46F70')}
            onClick={handleApprove}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            Deny & Notify Student
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
