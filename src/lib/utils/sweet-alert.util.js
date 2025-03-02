import Swal from 'sweetalert2';

const sweetAlert = {
  success,
  error,
  info,
  warn,
  question
};
export default sweetAlert;

/**
 * SweetAlert2를 사용하여 성공 알림을 표시합니다
 * @param {string} title - 알림에 표시할 제목 텍스트
 * @param {Object} props - SweetAlert 사용자 정의를 위한 선택적 추가 속성
 * @returns {Promise} - SweetAlert2 Promise 객체를 반환합니다
 */
function success(title, props) {
  return Swal.fire({
    icon: 'success',
    title,
    ...props
  });
}

/**
 * SweetAlert2를 사용하여 오류 알림을 표시합니다
 * @param {string} title - 알림에 표시할 제목 텍스트
 * @param {string} text - 제목 아래에 표시할 설명 텍스트
 * @param {Object} props - SweetAlert 사용자 정의를 위한 선택적 추가 속성
 * @returns {Promise} - SweetAlert2 Promise 객체를 반환합니다
 */
function error(title, text, props) {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    ...props
  });
}

/**
 * SweetAlert2를 사용하여 정보 알림을 표시합니다
 * @param {string} title - 알림에 표시할 제목 텍스트
 * @param {string} text - 제목 아래에 표시할 설명 텍스트
 * @param {Object} props - SweetAlert 사용자 정의를 위한 선택적 추가 속성
 * @returns {Promise} - SweetAlert2 Promise 객체를 반환합니다
 */
function info(title, text, props) {
  return Swal.fire({
    icon: 'info',
    title,
    text,
    ...props
  });
}

/**
 * SweetAlert2를 사용하여 경고 알림을 표시합니다
 * @param {string} title - 알림에 표시할 제목 텍스트
 * @param {string} text - 제목 아래에 표시할 설명 텍스트
 * @param {Object} props - SweetAlert 사용자 정의를 위한 선택적 추가 속성
 * @returns {Promise} - SweetAlert2 Promise 객체를 반환합니다
 */
function warn(title, text, props) {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    ...props
  });
}

/**
 * SweetAlert2를 사용하여 질문 알림을 표시합니다
 * @param {string} title - 알림에 표시할 제목 텍스트
 * @param {string} text - 제목 아래에 표시할 설명 텍스트
 * @param {Object} props - SweetAlert 사용자 정의를 위한 선택적 추가 속성
 * @returns {Promise} - SweetAlert2 Promise 객체를 반환합니다
 */
function question(title, text, props) {
  return Swal.fire({
    icon: 'question',
    title,
    text,
    ...props
  });
}
