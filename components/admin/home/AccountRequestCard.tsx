import { getInitials } from "@/lib/utils";

interface Props {
  fullName: string;
  email: string;
}

export default function AccountRequestCard({ fullName, email }: Props) {
  return (
    <div className="h-[50px] sm:h-[70px] rounded-md bg-admin-gray p-3 flex items-center gap-3 hover:shadow-sm transition">
      {/* Avatar */}
      <div className="hidden sm:flex flex-shrink-0 size-12 rounded-full bg-[#99AFFF] text-blue-700 items-center justify-center font-semibold text-lg">
        {getInitials(fullName)}
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0">
        <p className="font-semibold text-sm truncate">
          {fullName}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {email}
        </p>
      </div>
    </div>
  );
}