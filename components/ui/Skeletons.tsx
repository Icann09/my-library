export function StatsCardSkeleton() { 
  return ( 
  <div className="w-1/3 h-[90px] p-[14px] rounded-md flex flex-col justify-around bg-white animate-pulse"> 
    {/* title + change */} 
    <div className="h-4 w-2/3 bg-gray-200 rounded" /> 
    {/* total value */} 
    <div className="h-8 w-1/2 bg-gray-200 rounded" /> 
  </div> 
  ); 
}

export function StatsCardSkeletonGroup() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <StatsCardSkeleton key={index} />
      ))}
    </>
  );
}

export function BorrowedBooksCardSkeleton() {
  return (
    <div className="flex gap-2 p-2 bg-admin-gray justify-between rounded-md w-[508px] animate-pulse">
      {/* Book cover */}
      <div className="w-[48px] h-[64px] bg-gray-300 rounded-sm" />

      {/* Book info */}
      <div className="flex flex-col justify-between pr-9 w-[340px]">
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-gray-300 rounded" />
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
        </div>

        <div className="flex items-center gap-2 mt-2">
          {/* Avatar */}
          <div className="w-6 h-6 rounded-full bg-gray-300" />

          {/* Name */}
          <div className="h-3 w-20 bg-gray-200 rounded" />

          {/* Calendar + date */}
          <div className="h-4 w-4 bg-gray-200 rounded ml-2" />
          <div className="h-3 w-14 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Action icon */}
      <div className="flex items-start">
        <div className="p-2 bg-white rounded-md">
          <div className="h-5 w-5 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}

export function BorrowRequestSkeleton() {
  return (
    <div className="p-[10px] rounded-xl border border-[#E4E4F0] bg-white max-w-[540px] h-[380px] animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="h-8 w-20 bg-gray-200 rounded" />
      </div>

      {/* List */}
      <div className="relative flex flex-col gap-3 max-h-[300px] w-full overflow-y-auto pr-2 rounded-md">
        {Array.from({ length: 4 }).map((_, i) => (
          <BorrowedBooksCardSkeleton key={i} />
        ))}
      </div>

      {/* fade-out gradient */}
      <div className="pointer-events-none absolute bottom-[10px] left-[10px] right-[10px] h-[75px] bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}



export function AccountRequestCardSkeleton() {
  return (
    <div className="w-[160px] h-[130px] rounded-sm bg-admin-gray flex flex-col gap-2 justify-center items-center animate-pulse">
      {/* Avatar */}
      <div className="size-[48px] rounded-full bg-gray-300" />

      {/* Full name */}
      <div className="h-4 w-24 bg-gray-300 rounded" />

      {/* Email */}
      <div className="h-3 w-28 bg-gray-200 rounded" />
    </div>
  );
}

export function AccountRequestSkeleton() {
  return (
    <div className="p-[10px] rounded-xl border border-[#E4E4F0] bg-white max-w-[540px] h-[380px] flex flex-col relative animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-44 bg-gray-200 rounded" />
        <div className="h-8 w-20 bg-gray-200 rounded" />
      </div>

      {/* Scrollable grid */}
      <div className="relative flex-1 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 overflow-y-auto pr-2 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <AccountRequestCardSkeleton key={i} />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
      </div>
    </div>
  );
}


export function BookCardSkeleton() {
  return (
    <li className="flex flex-col items-center animate-pulse">
      {/* Book cover */}
      <div className="w-[128px] h-[192px] rounded-md bg-gray-300" />

      {/* Text */}
      <div className="mt-4 xs:max-w-40 max-w-2xl flex flex-col items-center gap-2">
        <div className="h-4 w-32 bg-gray-300 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </li>
  );
}


export function RecentlyAddedBooksSkeleton() {
  return (
    <div className="p-[10px] rounded-xl border border-[#E4E4F0] bg-white max-w-[540px] h-[772px] flex flex-col relative animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-56 bg-gray-200 rounded" />
        <div className="h-8 w-20 bg-gray-200 rounded" />
      </div>

      {/* Add new book card */}
      <div className="flex gap-2 h-[76px] w-[508px] p-2 bg-admin-gray items-center rounded-md">
        <div className="size-[48px] rounded-full bg-gray-300" />
        <div className="h-4 w-32 bg-gray-300 rounded" />
      </div>

      {/* Books list */}
      <div className="relative flex-1 overflow-hidden">
        <div className="flex gap-1 flex-col mt-3 overflow-y-auto pr-2 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
      </div>
    </div>
  );
}


export  function UsersTableSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b">
          {/* Name */}
          <td className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </td>

          {/* Date Joined */}
          <td className="p-4 text-center">
            <div className="h-4 w-20 mx-auto bg-gray-200 rounded animate-pulse" />
          </td>

          {/* Role */}
          <td className="p-4 text-center">
            <div className="h-8 w-20 mx-auto bg-gray-200 rounded-md animate-pulse" />
          </td>

          {/* Books Borrowed */}
          <td className="p-4 text-center">
            <div className="h-4 w-6 mx-auto bg-gray-200 rounded animate-pulse" />
          </td>

          {/* University ID */}
          <td className="p-4 text-center">
            <div className="h-4 w-24 mx-auto bg-gray-200 rounded animate-pulse" />
          </td>

          {/* ID Card */}
          <td className="p-4 text-center">
            <div className="h-8 w-8 mx-auto bg-gray-200 rounded-md animate-pulse" />
          </td>

          {/* Action */}
          <td className="p-4 text-center">
            <div className="h-8 w-8 mx-auto bg-gray-200 rounded-md animate-pulse" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}


export  function BooksTableSkeleton({ rows = 9 }: { rows?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="border-b animate-pulse">
          {/* Book cover + title */}
          <td className="p-4 flex items-center gap-3">
            <div className="w-8 h-12 rounded-sm bg-gray-200" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </td>

          {/* Author */}
          <td className="p-4">
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </td>

          {/* Genre */}
          <td className="p-4">
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </td>

          {/* Created date */}
          <td className="p-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </td>

          {/* Action */}
          <td className="p-4">
            <div className="h-8 w-8 bg-gray-200 rounded-md" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

