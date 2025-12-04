import { cn } from "@/lib/utils";
import { sendEmail } from "@/lib/workflow";
import { send } from "process";
import { Button } from "../ui/button";


// export default function BorrowReceiptBtn ({ receipt }: {receipt: ReceiptParams}) => {
//   const isGenerated = false;

//   const generateReceipt = await sendEmail(email)
//   return (
//     <div>
//       <button
//         disabled={isGenerated}
//         className={cn(
//           "px-3 py-1 text-sm rounded-md text-white transition",
//           isGenerated
//             ? "bg-gray-300 cursor-not-allowed"
//             : "bg-indigo-600 hover:bg-indigo-700"
//         )}
//         onClick={() => {
//           if (isGenerated) {
//             console.log("Generate receipt for", record.borrowId);
//           }
//         }}
//       >
//         {isGenerated ? "Receipt Generated" : "Generate Receipt"}
//       </button>
//     </div>
//   )
// }

export default function BorrowReceiptBtn ()  {
  return (
    <Button>
      Receipt
    </Button>
  )
}