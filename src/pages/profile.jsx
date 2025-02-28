import { MdOutlineAccessTime, MdOutlineLocationOn } from 'react-icons/md';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import ProfileForm from '@/components/features/profile/profile-form';
import { useAuthStore } from '@/stores/auth.store';

export default function Profile() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      {isAuth ? (
        <div className="flex flex-col items-center gap-4 h-full">
          <section className="flex flex-row border-2 border-primary rounded-lg w-full h-30">
            <ProfileForm />
          </section>
          <section className="flex flex-col border-2 border-primary rounded-lg p-4 w-full h-full">
            <div className="flex flex-col">
              <h3 className="mb-4">이전에 많이 간 장소</h3>
              <ul className="flex flex-row flex-wrap gap-4">
                <li className="border-2 border-primary p-4 rounded-lg w-[356px] h-[130px]">
                  <p className="flex items-center gap-1">
                    <MdOutlineLocationOn />
                    장소 주소1
                  </p>
                </li>
              </ul>
            </div>
            <hr className="border-1 border-primary m-5" />
            <section className="flex flex-col h-full justify-between">
              <div className="flex flex-col justify-center">
                <h3 className="mb-4">지난 일정</h3>
                <ul className="flex flex-row flex-wrap gap-4">
                  <li className="flex flex-col justify-between border-2 border-primary p-4 rounded-lg w-[356px] h-[130px]">
                    <p className="mb-1 font-semibold">누군가와의 약속</p>
                    <p className="flex items-center gap-1">
                      <MdOutlineAccessTime />
                      날짜
                    </p>
                    <p className="flex items-center gap-1">
                      <MdOutlineLocationOn />
                      장소 주소
                    </p>
                  </li>
                </ul>
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    <PaginationLink href="#">2</PaginationLink>
                    <PaginationLink href="#">3</PaginationLink>
                    <PaginationLink href="#">4</PaginationLink>
                    <PaginationLink href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center">로그인 후 이용해주세요.</p>
        </div>
      )}
    </>
  );
}
