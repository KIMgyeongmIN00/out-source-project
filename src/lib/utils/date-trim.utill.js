export function formatPlanDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const day = date.getDate();
  let hour = date.getHours();
  const minute = date.getMinutes();

  // 오전/오후 결정 (0시가 12시로 표시되어야 함)
  const period = hour < 12 ? '오전' : '오후';
  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${hour}시 ${minute}분`;
}
