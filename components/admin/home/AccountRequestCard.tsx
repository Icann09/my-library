import { getInitials } from "@/lib/utils";

interface Props {
  fullName: string;
  email: string;
}

export default function AccountRequestCard(props : Props) {
  const { fullName, email } = props;
  return (
    <div className="w-[160px] h-[130px] rounded-sm bg-admin-gray flex flex-col gap-1 justify-center items-center">
      <div className="text-[20px] font-semibold size-[48px] rounded-full border-[1px] bg-[#99AFFF] text-blue-700 p-1 flex justify-center items-center">
        {getInitials(fullName)}
      </div>
      <div className="font-semibold text-center text-[16px]">
        {fullName}
      </div>
      <div className="text-gray-400 text-[14px]">
        {email}
      </div>
    </div>
  )
}
