const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;
const NICKNAME_REGEX = /^[a-zA-Z가-힣0-9]{1,10}$/;

/**
 * 사용자 입력 유효성 검사 실패 시, 실패한 필드의 이름을 반환하는 함수
 * @param {object} formData - 유효성 검사할 객체 타입의 입력. 예시) { email: 'asdf@naver.com', password: 'example-password', nickname: '1234' }
 * @returns {string | null} - 유효성 검사에 실패한 key, 모두 통과하면 null 반환
 */
function checkInvalidForm(formData) {
  const invalidEntry = Object.entries(formData).find(([key, value]) => !checkValidValue(key, value));
  return invalidEntry ? invalidEntry[0] : null;
}

/**
 * 입력 필드의 이름과 값을 받아 유효성 검사 결과를 반환하는 함수
 * @param {string} name - 검사할 필드의 이름 (예: 'email', 'password', 'nickname')
 * @param {string} value - 검사할 필드의 값
 * @returns {boolean} - 유효성 검사 통과 여부 (true: 통과, false: 실패)
 */
function checkValidValue(name, value) {
  switch (name) {
    case 'email':
      return EMAIL_REGEX.test(value);
    case 'password':
      return PASSWORD_REGEX.test(value);
    case 'nickname':
      return NICKNAME_REGEX.test(value);
    default:
      return true;
  }
}

/**
 * 유효성 검사 실패 시 표시할 에러 메시지를 반환하는 함수
 * @param {string} name - 에러 메시지를 가져올 필드의 이름
 * @returns {string} - 해당 필드에 대한 에러 메시지
 */
function getErrorMessage(name) {
  switch (name) {
    case 'email':
      return '이메일 형식으로 입력해주세요.';
    case 'password':
      return '비밀번호는 영문, 숫자를 포함하여 6자에서 16자 이내로 입력해주세요.';
    case 'nickname':
      return '닉네임은 영문 또는 한글, 숫자로 1자에서 10자 이내로 입력해주세요.';
    default:
      return '';
  }
}

const authValidate = {
  checkInvalidForm,
  checkValidValue,
  getErrorMessage
};
export default authValidate;
