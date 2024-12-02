import React from "react";
import { Link } from 'react-router-dom';

const Main = () => {

  return (
    <div>
    <nav className="p-4 bg-gray-100">
      <ul className="flex flex-col space-y-2">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">홈</Link>
        </li>
        <li>
          <Link to="/login" className="text-blue-500 hover:underline">0.로그인</Link>
        </li>
        <li>
          <Link to="/profile" className="text-blue-500 hover:underline">1.1프로필 설정</Link>
        </li>
        <li>
          <Link to="/job-select" className="text-blue-500 hover:underline">1.2직무 선택</Link>
        </li>
        <li>
          <Link to="/interest-select" className="text-blue-500 hover:underline">1.3관심사 선택</Link>
        </li>
        <li>
          <Link to="/welcome" className="text-blue-500 hover:underline">1.4환영 페이지</Link>
        </li>
        <li>
          <Link to="/mypage" className="text-blue-500 hover:underline">마이 페이지</Link>
        </li>
        <li>
          <Link to="/mypage/account-settings" className="text-blue-500 hover:underline">2.계정 설정</Link>
        </li>
        <li>
          <Link to="/mypage/account-delete" className="text-blue-500 hover:underline">2.계정 삭제</Link>
        </li>
        <li>
          <Link to="/mypage/dotori-history" className="text-blue-500 hover:underline">2.보유 도토리</Link>
        </li>
        <li>
          <Link to="/mypage/my-postspage" className="text-blue-500 hover:underline">2.나의 게시글</Link>
        </li>
        <li>
          <Link to="/secession/success" className="text-blue-500 hover:underline">탈퇴 성공</Link>
        </li>
        <li>
          <Link to="/mypage/modify-profile" className="text-blue-500 hover:underline">프로필 수정</Link>
        </li>
        <li>
          <Link to="/board/blog-post" className="text-blue-500 hover:underline">3.게시글 보기</Link>
        </li>
        <li>
          <Link to="/board/blog-write" className="text-blue-500 hover:underline">3.게시글 쓰기</Link>
        </li>
        <li>
          <Link to="/board/editor" className="text-blue-500 hover:underline">editor</Link>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default Main;
