import React, { useState } from 'react';
import { IoChevronBack, IoChevronDown, IoCheckmarkOutline } from 'react-icons/io5';
import PageLayout from '../../layouts/PageLayout';
import { useNavigate } from 'react-router-dom';
interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

const SearchFilterPage = () => {
    const navigate = useNavigate();
  const [isIT, setIsIT] = useState(true);

  const [filters, setFilters] = useState<FilterOption[]>([
    { id: 'ux', label: 'UX/UI디자인', checked: true },
    { id: 'brand', label: '브랜드디자인', checked: false },
    { id: 'product', label: '프로덕트 개발', checked: false },
    { id: 'backend', label: '백엔드 개발', checked: false },
    { id: 'ai', label: 'AI/데이터', checked: false },
    { id: 'trend', label: '트렌드', checked: true },
    { id: 'salary', label: '실무 노하우', checked: true },
    { id: 'career', label: '커리어 성장', checked: false },
    { id: 'insight', label: '인사이트', checked: false },
  ]);

  const toggleFilter = (id: string) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, checked: !filter.checked } : filter
    ));
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <PageLayout
            title="계정 설정"
            onBack={() => navigate(-1)}
        >

      {/* <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <IoChevronBack className="w-6 h-6" />
          <span>글쓰기</span>
        </div>
        <button className="text-sm bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full">
          게시글 등록
        </button>
      </div> */}

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Type Selection */}
          <div className="flex gap-2 mb-6">
            <button 
              className={`flex-1 py-2.5 rounded-full text-sm ${isIT ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setIsIT(true)}
            >
              IT잡고
            </button>
            <button 
              className={`flex-1 py-2.5 rounded-full text-sm ${!isIT ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setIsIT(false)}
            >
              아티클
            </button>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <button className="w-full p-4 bg-gray-50 rounded-lg text-gray-600 flex items-center justify-between">
              <span>UX/UI디자인, 트렌드, 실무 노하우 외 1개</span>
              <IoChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Groups */}
          <div className="space-y-8">
            <div>
              <h3 className="text-gray-500 mb-3 text-sm">기획/PM</h3>
              <div className="space-y-5">
                {filters.slice(0, 5).map(filter => (
                  <button
                    key={filter.id}
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleFilter(filter.id)}
                  >
                    <span className="text-sm">{filter.label}</span>
                    {filter.checked && (
                      <IoCheckmarkOutline className="w-5 h-5 text-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-500 mb-3 text-sm">트렌드</h3>
              <div className="space-y-5">
                {filters.slice(5).map(filter => (
                  <button
                    key={filter.id}
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleFilter(filter.id)}
                  >
                    <span className="text-sm">{filter.label}</span>
                    {filter.checked && (
                      <IoCheckmarkOutline className="w-5 h-5 text-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4">
        <button className="w-full py-4 bg-orange-500 text-white rounded-lg">
          선택 완료
        </button>
      </div>
      </PageLayout>
    </div>
  );
};

export default SearchFilterPage;