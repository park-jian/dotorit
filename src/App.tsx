import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate} from 'react-router-dom';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
//import { useAppStore } from './store'
//메인페이지
import Home from './pages/Home';
import NotFound from './pages/NotFound';

//user
import UserLogin from './pages/user/Login'; //로그인
import LoginCallback from './pages/user/LoginCallback'; //로그인 성공시 콜백 페이지

import Profile from './pages/user/Profile'; //프로필설정
import JobSelection from './pages/user/JobSelection'; //프로필설정
import InterestSelection from './pages/user/InterestSelection'; //프로필설정
import WelcomePage from './pages/user/WelcomePage'; //프로필설정

//mypage
import Mypage from './pages/mypage/Mypage'; //마이페이지
import AccountSettings from './pages/mypage/AccountSettings'; // 계정 설정
import AccountDelete from './pages/mypage/AccountDelete'; // 계정 삭제
import DeletedAccountMessage from './pages/mypage/DeletedAccountMessage'; //그동안 감사했어요. 잘가용
import DotoriHistoryPage from './pages/mypage/DotoriHistoryPage'; //보유 도토리
import MyPostsPage from './pages/mypage/MyPostsPage'; //나의 게시글
import ModifyProfile from './pages/mypage/ModifyProfile'; //프로필 편집
//Board
import BlogPostDetail from './pages/board/BlogPostDetail'; //게시물 보기
import SearchFilterPage from './pages/board/SearchFilterPage';//게시물 쓰기
import PostEditor from './pages/board/PostEditor';//에디터

// import SocialLogin from './socialLogin/SocialLogin';
// import SocialLoginRedirect from './socialLogin/SocialLoginRedirect';
// import RegisterPage from './socialLogin/RegisterPage';
// import AxiosTest from './socialLogin/AxiosTest';

// import {AuthProvider, useAuth } from './auth/AuthContext';

    // <AuthProvider>
    //   {/* <Router> */}
    //   <Routes>
    //     <Route path="/login" element={
    //       <>
    //         <SocialLogin provider="kakao" />
    //         <SocialLogin provider="naver" />
    //       </>
    //     } />

    //     <Route path="/oauth/kakao/callback" element={<SocialLoginRedirect provider="kakao"/>} />
    //     <Route path="/oauth/naver/callback" element={<SocialLoginRedirect provider="naver"/>} />
    //     <Route path="/register" element={<RegisterPage />} />
    //     <Route path="/axiostest" element={<AxiosTest />} />
    //     <Route path="/" element={<Main />} />
    //     {/* 이미지 파일을 위한 라우트 추가 */}
    //     <Route path="*.png" element={null} />
    //   </Routes>


    //   {/* </Router> */}
    //   </AuthProvider>
    // PrivateRoute 컴포넌트 정의
// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useAuth();
  
//   if (!isAuthenticated) {
//     return <Navigate to="/users/login" replace />;
//   }

//   return <>{children}</>;
// };
    const App: React.FC = () => {
      return (
        <Router>
          
          <Routes>
            <Route path="/" element={<Layout />}>
            {/* user*/}
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/login/callback/auth" element={<LoginCallback />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/job-select" element={<JobSelection />} />
              <Route path="/interest-select" element={<InterestSelection />} />
              <Route path="/welcome" element={<WelcomePage />} />
              

              {/* mypage*/}
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/mypage/account-settings" element={<AccountSettings />} />
              <Route path="/mypage/account-delete" element={<AccountDelete />} />
              <Route path="/mypage/dotori-history" element={<DotoriHistoryPage />} />
              <Route path="/mypage/my-postspage" element={<MyPostsPage />} />
              <Route path="/mypage/modify-profile" element={<ModifyProfile />} />
              
              <Route path="/secession/success" element={<DeletedAccountMessage />} />

              <Route path="/board/blog-post" element={<BlogPostDetail />} />
              <Route path="/board/blog-write" element={<SearchFilterPage />} />
              <Route path="/board/editor" element={<PostEditor />} />
              
              {/* <Route path="/users/register" element={<UserRegister />} />
              <Route path="/users/password/new" element={<PrivateRoute><PasswordSearch /></PrivateRoute>} />
              <Route path="/users/join_success" element={<PrivateRoute><RegisterSuccess /></PrivateRoute>} />
    
              <Route path="/users/me" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/users/secession" element={<PrivateRoute><Secession /></PrivateRoute>} />
    
              
              <Route path="/resumes/list" element={<ResumeList />} />
    
              <Route path="/resumes/pending" element={<PrivateRoute><SalesResumeList /></PrivateRoute>} />
              <Route path="/resumes/pending/:salesPostId" element={<PrivateRoute><SalesResumeListOne /></PrivateRoute>} />
              <Route path="/resumes/register" element={<PrivateRoute><ResumeRegister /></PrivateRoute>} />
              <Route path="/resumes/:id" element={<PrivateRoute><ResumeEdit /></PrivateRoute>} />
              <Route path="/resumes/sale-resumes/" element={<PrivateRoute><MySalesResumes /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
              <Route path="/orders/:salesPostId" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
              <Route path="/resumes/admin" element={<PrivateRoute><AdminResumeList /></PrivateRoute>} />
              <Route path="/resumes/admin/:resumeId" element={<PrivateRoute><AdminResumeView /></PrivateRoute>} />
    
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} /> */}
    
              {/* NotFound route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      );
    };
const Layout: React.FC = () => {
  return (
    // <AuthProvider>
    <div className='flex flex-col justify-center items-center h-full border'>
      <div className="w-[360px] h-full overflow-y-auto">
        <div className="w-full h-full ">
          
          {/* <Header /> */}
        {/* </div> */}
          <Outlet />
        {/* <Footer /> */}
        </div>
      </div>
    </div>
    // </AuthProvider>
  );
}
export default App