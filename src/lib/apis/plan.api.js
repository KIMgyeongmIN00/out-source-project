import axiosInstance from "@api/axios.api";


// 데이터 전부 가져오기
export async function fetchData(tableName) {
  try {
    const response = await axiosInstance.get(`${tableName}?select=*`);
    return response.data;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    throw error;
  }
};

// 필터링된 데이터 가져오기
export async function fetchFilteredData(tableName, filters = {}) {
  try {
    if (!tableName) throw new Error("테이블 이름을 입력하세요.");

    const response = await axiosInstance.get(`/${tableName}`, {
      params: {
        select: "*",
        ...filters, // 필터링 조건 ex) { id: "eq.${값}", title: "eq.${제목}" } 
      },
    });

    return response.data;
  } catch (error) {
    console.error("필터링된 데이터 가져오기 실패:", error);
    throw error;
  }
};

// 데이터 추가하기
export async function addData(tableName, data) {
  try {
    const response = await axiosInstance.post(`${tableName}`, data);
    return response.data;
  } catch (error) {
    console.error("데이터 추가 실패:", error);
    throw error;
  }
};

// 데이터 수정하기
export async function updateData(tableName, id, data) {
  try {
    const response = await axiosInstance.patch(`${tableName}?id=eq.${id}`, data);
    return response.data;
  } catch (error) {
    console.error("데이터 수정 실패:", error);
    throw error;
  }
};

// 데이터 삭제하기
export async function deleteData(tableName, id) {
  try {
    const response = await axiosInstance.delete(`${tableName}?id=eq.${id}`);
    return response.data;
  } catch (error) {
    console.error("데이터 삭제 실패:", error);
    throw error;
  }
};