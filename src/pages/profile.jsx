// import { supabase } from '@/lib/apis/supabase.api';
// import { useState } from 'react';
// import { useEffect } from 'react';

// export default function Profile() {
//   const [isAuth, setIsAuth] = useState(true);
//   const [id, setId] = useState('ff09f687-c53f-4c6d-a7b6-c92b330d68e4');
//   useEffect(() => {
//     //  user가 존재할 때만 실행
//     if (isAuth) {
//       const getUserInfo = async () => {
//         try {
//           const { data, error } = await supabase
//             .from('users') // public.users 테이블에서
//             .select('*')
//             .eq('id', id) //  id가 같은 유저만 가져옴
//             .single(); //  단일 데이터만 가져오기

//           console.log(data);
//           if (error) throw error;
//         } catch (error) {
//           console.error('유저 정보 가져오기 오류:', error);
//         }
//       };

//       getUserInfo();
//     }
//   }, [id]);
//   return <div></div>;
// }
