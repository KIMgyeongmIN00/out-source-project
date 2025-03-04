import { axiosApi } from '@api/axios.api';

/**
 * 현재 날짜 이후의 사용자 일정을 페이지네이션으로 조회합니다.
 *
 * @param {string} userId - 조회할 사용자의 UUID
 * @param {number} [page=1] - 요청할 페이지 번호 (기본값: 1)
 * @param {number} [limit=10] - 페이지당 가져올 일정 수 (기본값: 10)
 * @returns {Promise<Object>} - 일정 데이터가 포함된 응답 객체
 */
export async function fetchUpcomingPlans(userId, page = 1, limit = 10) {
  const currentDate = new Date().toISOString();
  return await axiosApi.get('/plans', {
    params: {
      select: '*',
      user_id: `eq.${userId}`,
      date: `gte.${currentDate}`,
      order: 'date.asc',
      limit: limit,
      offset: (page - 1) * limit
    }
  });
}

// 내 계획 갯수대로 가져오기 (무한 스크롤은 추가 로직으로 limit와 offset 알고리즘 구현 해야됩니다...)
// limit => 얼만큼? , offset => 어디서 부터?
export async function fetchMyPlansLimit(myId, limit, offset) {
  const response = await axiosApi.get('plans', {
    params: {
      select: '*',
      user_id: `eq.${myId}`,
      limit,
      offset
    }
  });
  return response;
}

// 해당 장소의 내 계획 가져오기
export async function fetchPlacePlan(address, myId) {
  const response = await axiosApi.get('plans', {
    params: {
      select: '*',
      address: `eq.${address}`,
      user_id: `eq.${myId}`
    }
  });
  return response;
}

// 해당 아이디 값의 계획 가져오기 (공유 기능 대비)
export async function fetchSharePlan(planId) {
  const response = await axiosApi.get('plans', {
    params: {
      select: '*',
      id: `eq.${planId}`
    }
  });
  return response;
}

// 계획 추가하기
export async function createData(data) {
  const response = await axiosApi.post('plans', data);
  return response;
}

// 계획 수정하기
export async function updateData(id, data) {
  const response = await axiosApi.patch(`plans?id=eq.${id}`, data);
  return response;
}

// 계획 삭제하기
export async function deleteData(id) {
  const response = await axiosApi.delete(`plans?id=eq.${id}`);
  return response;
}
export async function fetchAllMyPlans(myId) {
  const response = await axiosApi.get('plans', {
    params: {
      select: '*',
      user_id: `eq.${myId}`,
    },
  });
  return response;
}