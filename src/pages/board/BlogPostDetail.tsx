import React, { useState, useEffect } from 'react';
import { IoChevronBack, IoSearchOutline, IoPersonOutline, IoHeartOutline, IoChatbubbleOutline, IoShareSocialOutline, IoBookmarkOutline, IoChevronDown } from 'react-icons/io5';
import { shareKakao } from '../../utils/shareKakaoLink';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';
interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar: string;
}

interface RelatedPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  likes: number;
  comments: number;
  timeAgo: string;
  authorAvatar: string;
}

const BlogPostDetail = () => {
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const handleShare = () => {
    if (window.Kakao) {
      shareKakao({
        title: post.title,
        description: post.content,
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        linkUrl: window.location.href, // 현재 페이지 URL
      });
    } else {
      console.error('Kakao SDK not loaded');
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  const post: Post = {
    id: '1',
    title: '게시물 타이틀 영역 최대 몇자 게시물 타이틀 최대몇..',
    content: '누구나 참여하는 커뮤니티 누구나 참여하는 도토릿 도토릿 누구나 참여하는 도토릿',
    date: '24.10.12 13:00',
    views: 324,
    likes: 2,
    comments: 4,
    tags: ['#디자인', '#기업협업', '#포토챌린']
  };

  const comments: Comment[] = [
    {
      id: '1',
      author: '개발자',
      content: '내용이 너무 좋아요. 좋은 글 감사합니다. 내용이 너무 좋아요. 좋은 글 감사합니다. 내용이 너무 좋아요. 좋은 글 감사합니다. 내용이 너무 좋아요. 좋은 글 감사합니다.',
      date: '24.10.12 13:00',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '2',
      author: '그날그날',
      content: '내용이 너무 좋아요. 좋은 글 감사합니다.',
      date: '24.10.12 13:00',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '3',
      author: '기획요니부',
      content: '도토리 파찌아요',
      date: '24.10.12 13:00',
      avatar: '/api/placeholder/32/32'
    }
  ];

  const relatedPosts: RelatedPost[] = [
    {
      id: '1',
      title: '게시물 타이틀 영역 최대 몇자 게시물 타이틀 최대몇..',
      content: '누구나 참여하는 커뮤니티 누구나 참여하는 도토릿 도토릿 누구나 참여하는 도토릿',
      author: '기획콘냥',
      tags: ['#디자인', '#기업협업', '#포토챌린'],
      likes: 2,
      comments: 4,
      timeAgo: '10분 전',
      authorAvatar: '/api/placeholder/32/32'
    },
    {
      id: '2',
      title: '게시물 타이틀 영역 최대 몇자 게시물 타이틀',
      content: '누구나 참여하는 커뮤니티 누구나 참여하는 도토릿 도토릿 도토릿',
      author: '기획콘냥',
      tags: ['#디자인', '#기업협업', '#포토챌린'],
      likes: 2,
      comments: 4,
      timeAgo: '10분 전',
      authorAvatar: '/api/placeholder/32/32'
    },
    {
      id: '3',
      title: '게시물 타이틀 영역 최대 몇자 게시물 타이틀',
      content: '누구나 참여하는 커뮤니티 누구나 참여하는 도토릿 도토릿 커뮤...',
      author: '기획콘냥',
      tags: ['#디자인', '#기업협업', '#포토챌린'],
      likes: 2,
      comments: 4,
      timeAgo: '10분 전',
      authorAvatar: '/api/placeholder/32/32'
    }
  ];

  return (
    <div className="max-w-lg mx-auto bg-white h-full overflow-y-auto">
      {/* Header */}
      <PageLayout
            title=""
            onBack={() => navigate(-1)}
        >
        <div className="ml-72 mt-3 w-[60px] h-6 flex flex-row justify-end items-center p-0 gap-3 z-[1]">
          <img className='w-6 h-6' src='/ic_search.svg'/>
          <img className='w-6 h-6' src='/ic_mypage.svg'/>
        </div>

      {/* Post title */}
      <div className="">
        <div className="flex flex-col mx-4 mt-4 gap-3 mb-3.5 border-b border-gray-100">
          {/* Tags */}
          <div className="static left-0 top-0 h-5 flex items-center p-0 gap-1 z-0 mb-2">
            {post.tags.map((tag) => (
              <span className="static left-[103px] top-0 h-5 flex justify-center items-center px-1 py-0.5 gap-0.5 z-2 rounded-[2px] opacity-100 bg-gray-100
              font-pretendard text-[11px] font-semibold leading-[140%] flex items-center tracking-[-0.025em] text-gray-500" key={tag}>{tag}</span>
            ))}
          </div>

          {/* Title & Meta */}
          <div className="static left-0 top-7 w-[328px] h-[47px] flex gap-2 self-stretch z-[1] ">
            <span className="font-pretendard text-lg font-bold leading-[130%] tracking-[-0.025em] text-[#212121]">{post.title}</span>
            <img src="/ic_more.svg"/>
          </div>
            {/* 날짜, 조회 */}
          <div className=" w-[328px] h-[17px] flex justify-between items-center self-stretch z-[1]">
            <span className="font-pretendard text-xs font-normal leading-[140%] tracking-[-0.025em] text-gray-400">
              24.10.09 10:23
            </span>
            <div className="static left-72 top-0 w-10 h-[17px] flex items-center gap-1 z-[1]">
              <img className="w-4 h-4" src="/ic_view_16.svg"/>
              <span className="font-pretendard text-xs font-normal leading-[140%] tracking-[-0.025em] text-gray-400">
                326
              </span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col mx-4 mt-4 gap-3 mb-3.5 border-b border-gray-100">
          <div className="mt-4 text-gray-800">
            <p>{post.content}</p>
          </div>
        </div>
        {/* Action Row */}
        <div className="mt-6 flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1">
              <IoHeartOutline className="w-5 h-5" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1">
              <IoChatbubbleOutline className="w-5 h-5" />
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <IoShareSocialOutline className="w-5 h-5" onClick={handleShare}/>
            <IoBookmarkOutline className="w-5 h-5" />
            {/* <button onClick={() => shareKakao(route, title)}>
              <img className="w-12 h-12" src={`${process.env.PUBLIC_URL}/assets/KakaoLogo.png`} alt={"Kakao Logo"} />
            </button> */}
          </div>
        </div>
       </div>

      {/* Comments Section */}
      <div className="bg-blue-50">
        {/* Comment List */}
        <div className="divide-y divide-blue-100">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4">
              <div className="flex gap-2">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Comments Button */}
        <button className="w-full py-3 text-sm text-gray-500 flex items-center justify-center gap-1">
          댓글 더보기 <IoChevronDown className="w-4 h-4" />
        </button>

        {/* Related Posts Section */}
        <div className="mt-4">
          {/* Section Tabs */}
          <div className="flex border-y border-blue-100 bg-white">
            <div className="flex-1 text-center py-3 border-b-2 border-black font-medium">
              이와 비슷한 글이에요!
            </div>
            <div className="flex-1 text-center py-3 text-gray-400">
              지금 인기 있는 글들이에요!
            </div>
          </div>

          {/* Related Posts List */}
          <div className="bg-white divide-y">
            {relatedPosts.map((post) => (
              <div key={post.id} className="p-4">
                <div className="flex gap-2 text-xs text-gray-500 mb-2">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <h3 className="font-medium mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{post.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm">{post.author}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <IoHeartOutline className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoChatbubbleOutline className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-lg mx-auto p-4">
          <input
            type="text"
            placeholder="댓글을 남겨주세요"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
      </div>
      </PageLayout>
    </div>
  );
};

export default BlogPostDetail;