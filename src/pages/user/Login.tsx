import React from "react";
import logo from '/logo.png';
import naverimg from '/naverimg.png';
import kakaoimg from '/kakaoimg.png';
export default function Login() {
  //const [error, setError] = useState<string | null>(null);
  const handleLogin = (social: 'kakao' | 'naver') => {
    let loginUrl = '';
    //if (social === 'kakao') {
      loginUrl = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/${social}`;
   // } 
    // else {
    //   //loginUrl = `${import.meta.env.VITE_SERVER_URL}/login/oauth2/code/${social}`;
    //   loginUrl = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/${social}`;
    // }
    window.location.href = loginUrl;
  };
  return (
    <div className="flex flex-col items-center relative w-full h-[100dvh] overflow-hidden bg-custom-bg px-6">
      {/*로고*/}
      <div className="px-2 w-full pt-[131px]">
        <img src={logo} alt="Dotoring Logo" className="w-23 h-6" />
        {/*title*/}
        <div className="mt-6">
          <div className=" text-xl font-bold leading-[130%] flex flex-col tracking-tight text-[#424242]">
            <div>커리어 고민과 이야기들,</div>
            <div>도토릿에서 함께 나누고 성장해요!</div>
          </div>
          <div className="text-sm font-normal leading-[140%] text-center flex items-center tracking-tight w-[305px] text-[#757575] mt-[11.5px] ">
            IT 멘토링: 커뮤니티
          </div>
        </div>
      </div>
      {/*sns button*/}
      <div className="absolute bottom-[88px] w-[312px] h-[110px] flex flex-col justify-center p-0 gap-[10px]">
        <button className="static left-0 top-[60px] w-[312px] h-[50px] flex flex-row justify-center items-center 
          px-[70px] py-[15px] gap-[10px] self-stretch z-[1] rounded-lg bg-[#34C947]" type="button"
          onClick={() => handleLogin('naver')}
        >
            <img src={naverimg} alt="Naver Logo" className="w-[20px] h-[20px]" />
            <span className="text-[15px] font-bold leading-[130%] text-center flex items-center tracking-tight text-white">
              네이버로 시작하기
            </span>
        </button>
        <button className="static left-0 top-[60px] w-[312px] h-[50px] flex flex-row justify-center items-center 
          px-[70px] py-[15px] gap-[10px] self-stretch z-[1] rounded-lg bg-[#FFCC49]" type="button"
          onClick={() => handleLogin('kakao')}>
            <img src={kakaoimg} alt="Kakao Logo" className="w-[20px] h-[20px]" />
            <span className="text-[15px] font-bold leading-[130%] text-center flex items-center tracking-tight text-[#212121]">
              카카오로 시작하기
            </span>
        </button>
      </div>
      {/*서비스 소개*/}
      <div className="absolute text-sm font-normal leading-[140%] text-center flex items-center tracking-tight text-[#9E9E9E] bottom-[34px]">
        <a href="#" className="">서비스 소개</a>
        </div>
    </div>
  );
}
