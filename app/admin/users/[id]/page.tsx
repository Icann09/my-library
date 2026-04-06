import { fetchUserWithId } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
  const { id } = await params;
  const user = await fetchUserWithId(id);

  if (!user) {
    notFound();
  }

  const initials = getInitials(user.fullName);

  return (
    <section className="flex flex-col gap-3"> 
        <div>
        <Button className="bg-white hover:bg-primary-admin  text-black hover:text-white " asChild>
          <Link href="/admin/users" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Link> 
        </Button>
      </div>
      <div className="bg-[linear-gradient(#232839,#12141D)] rounded-2xl w-full max-w-xl mx-auto relative flex flex-col items-center pt-10 mt-10 pb-12 sm:pb-8">
        <Image
          src="/images/frame-id.png"
          width={59}
          height={88}
          alt="frame-id"
          className="absolute -top-6 left-1/2 -translate-x-1/2"
        />

        {/* Profile Info */}
        <div className="w-full px-6 flex flex-col gap-6 mt-12 text-white">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="bg-[#323a54] h-20 w-20 rounded-full flex items-center justify-center shrink-0">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-amber-100 font-bold text-2xl text-black">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">Verified student</p>
              <p className="font-bold text-lg">{user.fullName}</p>
              <p className="text-sm break-all">{user.email}</p>
            </div>
          </div>

          {/* University */}
          <div>
            <p className="text-xs text-gray-400">University</p>
            <p className="font-semibold text-lg">Hasanuddin University</p>
          </div>

          {/* Student ID */}
          <div>
            <p className="text-xs text-gray-400">Student ID</p>
            <p className="font-semibold text-lg">{user.universityId}</p>
          </div>
        </div>

        {/* ID Card Image */}
        <div className="w-full px-6 mt-6">
          <Image
            src="/images/id-card.png"
            alt="id-card"
            width={486}
            height={287}
            className="rounded w-full h-auto"
          />
        </div>
      </div>
    </section>
      
  );
}