"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { approveAccountRequest } from "@/lib/admin/actions/user";
import { useRouter } from "next/navigation";

export default function ApproveRequestBtn({ userId }: { userId: string }) {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await approveAccountRequest(userId);
      if (res.success) {
        toast.success("Account approved and confirmation sent.");
        router.refresh();
        setModalOpen(false);
      } else {
        toast.error("Failed to approve account.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)} className="cursor-pointer  bg-green-200 text-green-800 hover:bg-green-300">Approve Account</Button>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="text-center px-8 py-6 max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <CheckCircle className="text-green-600 w-10 h-10" />
            </div>
            <DialogTitle className="text-xl text-center">Approve Book Request</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-6">
            Approve the student’s account request and grant access. A confirmation email will be sent upon approval.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleApprove}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            Approve & Send Confirmation
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
