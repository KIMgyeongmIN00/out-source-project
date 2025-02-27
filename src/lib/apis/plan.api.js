import axiosApi from "@api/axios.api";


// 내 계획 갯수대로 가져오기 (무한 스크롤은 추가 로직으로 limit와 offset 알고리즘 구현 해야됩니다...)
export async function fetchMyPlansLimit(myId, limit, offset) {
  const response = await axiosApi.get('plans', {
    params: {
      select: '*',
      ...{ user_id: `eq.${myId}` },
      limit,
      offset,
    },
  });
  console.log(response)
  return response;
}

// 해당 장소의 내 계획 가져오기
export async function fetchPlacePlan(address, myId) {
  const response = await axiosApi.get('plans', {
    params: {
      select: '*',
      ...{ address: `eq.${address}`, user_id: `eq.${myId}` },
    },
  });
  return response;
}

// 해당 아이디 값의 계획 가져오기 (공유 기능 대비)
export async function fetchSharePlan(planId) {
  const response = await axiosApi.get('plans', {
    params: {
      select: '*',
      ...{ id: `eq.${planId}` },
    },
  });
  return response;
}

// 계획 추가하기
export async function createData(data) {
  const response = await axiosApi.post('plans', data);
  return response;
};

// 계획 수정하기
export async function updateData(id, data) {
  const response = await axiosApi.patch(`plans?id=eq.${id}`, data);
  return response;
};

// 계획 삭제하기
export async function deleteData(id) {
  const response = await axiosApi.delete(`plans?id=eq.${id}`);
  return response;
};

