import StatsCard from "@/components/admin/home/StatsCard";
import { Suspense } from "react";
import { AccountRequestSkeleton, BorrowRequestSkeleton, RecentlyAddedBooksSkeleton, StatsCardSkeletonGroup } from "@/components/ui/Skeletons";
import BorrowRequest from "@/components/admin/home/BorrowRequest";
import AccountRequest from "@/components/admin/home/AccountRequest";
import RecentlyAddedBooks from "@/components/admin/home/RecentlyAddedBooks";



export default async function Page() {

  return (
    <div>
      {/* Stats  */}
      <section className="flex gap-3 pb-4">
        <Suspense fallback={<StatsCardSkeletonGroup />}>
          <StatsCard />
        </Suspense>
      </section>
      <section className="flex justify-between">
        {/* Borrow and Account request */}
        <div className="flex flex-col gap-3">
          {/* Borrow request */}  
          <Suspense fallback={<BorrowRequestSkeleton />}>
            <BorrowRequest />
          </Suspense>
          {/* Account request  */}
          <Suspense fallback={<AccountRequestSkeleton />}>
            <AccountRequest />
          </Suspense>
        </div>
        {/* Books */}
        <div>
          <Suspense fallback={<RecentlyAddedBooksSkeleton />}>
            <RecentlyAddedBooks />
          </Suspense>
        </div>
      </section>
    </div>

  )
}