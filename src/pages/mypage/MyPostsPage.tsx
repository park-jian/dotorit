import React, {useState, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';
import PostList from '../../components/board/PostList'
interface PostType {
  id: number;
  tags: string[];
  title: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
  hasImage?: boolean;
}
const MyPostsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'wrote' | 'saved'>('wrote');//내가 쓴 글인지, 저장한 글인지
  const [sortBy, setSortBy] = useState<'latest' | 'view'>('latest');//최신순인지 조회순인지
  const [posts, setPosts] = useState<PostType[]>([]);
  const MyWroteLatestData = [//내가 쓴 글 최신순
    {
      id: 1,
      tags: ['디자인', '기업문화', '프로젝트'],
      title: '게시물타이틀영역 최대 문자 게시물타이틀',
      content: '누구나 참여하는 커뮤니티 누구나 참여하는 도토리 도토링 누구나 참여하는 커뮤니티 누구나 참여하는 누나 참여하는 커뮤니티 누구나 참여하는 도토...',
      likes: 2,
      comments: 4,
      date: '24.10.12 13:00'
    },
    {
      id: 2,
      tags: ['디자인', '기업문화', '프로젝트'],
      title: '게시물타이틀영역 최대 문자 어디요 맞자요',
      content: '누구나 참여하는 커뮤니티 누구나 참여하는 도토링 도토링 맞누구나 참여하 누구나 참여하는 커뮤니티 누구나 참여하는 도토링 도토링 누구나 참여하는 커뮤니티 누구나 참여하',
      likes: 2,
      comments: 4,
      date: '24.10.12 13:00',
      hasImage: true
    }
  ];
  const MyWroteViewData = [//내가 쓴 글 조회 순
    {
      id: 3,
      tags: ['기업문화', '프로젝트'],
      title: '내가 쓴 글 조회순이다.',
      content: '누구나 참여하는 내가 쓴글 조회순입니다. ',
      likes: 12,
      comments: 5,
      date: '24.11.12 13:00'
    },
    {
      id: 4,
      tags: ['디자인', '프로젝트'],
      title: '게시물타이틀영역 최대 문자 어디요 맞자요',
      content: '누구나 참여하는 커뮤니티 누구나 참여하는 도토링 도토링 맞누구나 참여하 누구나 참여하는 커뮤니티 누구나 참여하는 도토링 도토링 누구나 참여하는 커뮤니티 누구나 참여하',
      likes: 2,
      comments: 4,
      date: '24.10.12 13:00',
      hasImage: true
    }
  ];
  const MySavedLatestData = [//저장한 글 최신순
    
  ];
  const MySavedViewData = [//저장한 글 조회순
    
  ];
  // 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // URL에 탭과 정렬 방식을 포함
        //const response = await fetch(`/api/posts/${activeTab}/${sortBy}`);
        //const data = await response.json();
        if (activeTab === 'wrote' && sortBy === 'latest') {
          setPosts(MyWroteLatestData);
        } else if (activeTab === 'wrote' && sortBy === 'view') {
          setPosts(MyWroteViewData);
        } else if (activeTab === 'saved' && sortBy === 'latest') {
          setPosts(MySavedLatestData);
        } else {
          setPosts(MySavedViewData);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [activeTab, sortBy]); // 탭이나 정렬 방식이 변경될 때만 데이터를 새로 가져옴

  // 정렬 방식 변경 핸들러
  const handleSortChange = (newSort: 'latest' | 'view') => {
    setSortBy(newSort);
  };

  return (
    <>
      <PageLayout
            title="글 목록"
            onBack={() => navigate(-1)}
        >
          {/* Tabs */}
          <div className="mt-12 w-[360px] h-[39px] flex items-center border-b border-[#E0E0E0]">
            <div 
              onClick={() => {
                setActiveTab('wrote')
              }}
              className={`flex-1 w-[180px] h-10 flex justify-center items-center px-3 py-2.5 gap-1.5 flex-grow rounded-t-lg
               ${activeTab === 'wrote' ? 'border-b-[3px] border-[#212121]' : ''}`}>
              <button 
                className={`font-pretendard text-sm font-bold leading-[130%] text-center flex items-center tracking-tight
                ${activeTab === 'wrote' ? 'text-[#212121]' : 'text-[#757575]'}`}>
                내가 쓴 글
              </button>
            </div>
            <div 
              onClick={() => setActiveTab('saved')}
              className={`flex-1 w-[180px] h-10 flex justify-center items-center px-3 py-2.5 gap-1.5 flex-grow rounded-t-lg
              ${activeTab === 'saved' ? 'border-b-[3px] border-[#212121]' : ''}`}>
              <button
                className={`font-pretendard text-sm font-bold leading-[130%] text-center flex items-center tracking-tight
                ${activeTab === 'saved' ? 'text-[#212121]' : 'text-[#757575]'}`}>
                저장한 글
              </button>
            </div>
          </div>
        
          <PostList
            posts={posts}
            type={activeTab}
            onSortChange={(sort) => {
              handleSortChange(sort);
            }}
          />

     

      </PageLayout>
    </>
  );
};

export default MyPostsPage;