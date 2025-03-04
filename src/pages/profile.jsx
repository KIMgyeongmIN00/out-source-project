import ProfileForm from '@/components/features/profile/profile-form';
import useGetAllPlansQuery from '@/lib/hooks/use-get-all-plans-query';
import ProfilePagination from '@/components/features/profile/profile-pagination';
import ProfileMostVisitedPlace from '@/components/features/profile/profile-most-visited-place';

export default function Profile() {
  const { plans, isPending, isError } = useGetAllPlansQuery();

  if (isPending) {
    return <div>계획 불러오는 중...</div>;
  }

  if (isError) {
    return <div>계획 불러오기 실패</div>;
  }
  return (
    <div className="flex flex-col items-center gap-4 h-full overflow-y-auto">
      <section className="flex flex-row border-2 border-primary rounded-lg w-full h-30 p-4">
        <ProfileForm />
      </section>
      <section className="flex flex-col border-2 border-primary rounded-lg p-4 w-full h-auto">
        <ProfileMostVisitedPlace plans={plans} />
        <hr className="border-1 border-primary m-5" />
        <ProfilePagination />
      </section>
    </div>
  );
}
