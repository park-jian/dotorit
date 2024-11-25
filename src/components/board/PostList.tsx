//내가 저장한 글, 내가 쓴 글, 최신순, 조회순
import React, {useState} from 'react';

// 게시물 데이터 타입 정의
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

// props 인터페이스
interface PostListProps {
    posts: PostType[];
    type: 'wrote' | 'saved';
    onSortChange: (sort: 'latest' | 'view') => void;
  }

const PostList: React.FC<PostListProps> = ({ posts, type, onSortChange }) => {
    const [sortBy, setSortBy] = useState<'latest' | 'view'>('latest');

    const handleSortChange = (newSort: 'latest' | 'view') => {
      setSortBy(newSort);
      onSortChange(newSort);
    };

    return (
        <div className="px-4 pb-24">
            {/* Sort Buttons */}
            {posts.length > 0 ? (

                <div className="h-[76px]">
                    <div className="my-[18px] absolute right-0 mr-4 w-[113px] h-[31px] flex items-center p-1 gap-0.5 rounded-[10px] bg-[#EEEEEE]">
                        <button 
                            onClick={() => handleSortChange('latest')}
                            className={`rounded-lg ${sortBy === 'latest' ? 'bg-white shadow-sm' : ''} static left-1 top-1 w-[59px] h-[23px] flex justify-center items-center px-1.5 py-[3px] gap-2.5 font-pretendard text-xs font-normal leading-[140%] tracking-tight text-neutral-700`}
                        >
                            최신 순
                        </button>
                        <button 
                            onClick={() => handleSortChange('view')}
                            className={`rounded-lg ${sortBy === 'view' ? 'bg-white shadow-sm' : ''} static left-1 top-1 w-[59px] h-[23px] flex justify-center items-center px-1.5 py-[3px] gap-2.5 font-pretendard text-xs font-normal leading-[140%] tracking-tight text-neutral-700`}
                        >
                            조회 순
                        </button>
                    </div>
                </div>
            ) : ''}

            {/* Posts List */}
            {posts.length > 0 ? (

                <div className="divide-y divide-neutral-100 [&>*+*]:pt-4">
                {posts.map(post => (

                        <div key={post.id} className="mb-4 w-[328px] flex flex-col gap-3 self-stretch z-0">
                            <div className=" h-[19px] flex flex-row items-center p-0 gap-1 z-0">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="flex flex-row justify-center items-center p-[2px] px-1 gap-0.5 z-2 rounded-[2px] opacity-100 bg-neutral-100 font-pretendard text-[11px] font-medium leading-[140%] flex items-center tracking-tight text-neutral-500">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="font-pretendard text-[14px] font-bold leading-[130%] tracking-tight text-neutral-800">{post.title}</div>
                            <div className='w-full h-[70px] flex flex-row gap-2 self-stretch z-1'>
                                <p className="flex-1 font-pretendard text-xs font-normal leading-[140%] tracking-[-0.5px] text-gray-900">{post.content}</p>
                                {post.hasImage && (
                                    <div className="w-[70px] h-[70px] shrink-0 rounded bg-neutral-100" />
                                )}
                            </div>
                        
                            
                        
                            <div className="w-[328px] h-[17px] flex flex-row justify-between items-center p-0 self-stretch z-1">
                                <div className=' h-[17px] flex flex-row items-center p-0 gap-2 z-0'>
                                    <div className="w-[24px] h-[17px] flex flex-row items-center p-0 gap-2 z-0">
                                        {/* <IoHeartOutline className="w-4 h-4" /> */}
                                        <img className='w-4 h-4' src='/ic_like.svg'/>
                                        <span className="font-pretendard text-xs font-normal leading-[140%] tracking-tight text-gray-900">{post.likes}</span>
                                    </div>
                                    <div className="w-[24px] h-[17px] flex flex-row items-center p-0 gap-2 z-0">
                                        <img className='w-4 h-4' src='/ic_comment.svg'/>
                                        <span className="font-pretendard text-xs font-normal leading-[140%] tracking-tight text-gray-900">{post.comments}</span>
                                    </div>
                                </div>
                                <span className="font-[Pretendard] text-xs font-medium leading-[140%] tracking-[-0.025em] text-[#E0E0E0]">{post.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='mt-[47px] ml-[16px] mr-[16px] font-pretendard text-sm font-normal leading-[140%] text-center tracking-tight text-neutral-400'>
                    {type === 'wrote' ? '앗! 아직 게시글이 없어요.' : '앗! 아직 저장한 글이 없어요.'}

                </div>
            )}
        </div>
    );
};

export default PostList;