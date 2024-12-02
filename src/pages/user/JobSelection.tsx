import React, { useState, useEffect } from 'react';
import ic_arrow_left from '/ic_arrow_left.png';
import { useNavigate, useLocation  } from 'react-router-dom';
import JobSelect, {SelectionData } from '../../components/select/JobSelect';

const JobSelection: React.FC = () => {
  const location = useLocation();
  const { nickname, selectedCharacter, selectedColor, profileImage } = location.state;
  // API로 받아올 데이터를 위한 상태
  const [sectionData, setSectionData] = useState<SelectionData[]>([]);
  // 선택된 값들을 관리하는 상태
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 임시로 더미 데이터 사용 (추후 API 연동 시 제거)
  useEffect(() => {
    const dummyData: SelectionData[] = [
      {
        title: '직무',
        keyword: "job",
        items: ['기획/PM', 'UX/UI 디자인', '브랜드 디자인', '프론트엔드 개발', '백엔드 개발', 'AI/데이터']
      },
      {
        title: '경력',
        keyword: "personalHistory",
        items: ['경력없음', '신입-2년', '3년-5년', '6년-9년', '10년 이상']
      },
      {
        title: '기업 형태',
        keyword: "corporateForm",
        items: ['스타트업', '유니콘 기업', '중기업', '대기업', '외국계 기업']
      },
      {
        title: '내 상태 태그 (복수 선택 가능)',
        keyword: "myStatus",
        items: ['프로이직러', '직무전환', '창업가', '비전공자 출신', '경력 미니어', 
                '자격증 수집가', '대학생', '구직중', '틸러터', '프리랜서', 'N잡러', '스티브 죽덕'],
        isMultiSelect: true
      }
    ];

    setSectionData(dummyData);
    const initialSelections = dummyData.reduce((acc, section) => ({
      ...acc,
      [section.keyword]: []
    }), {});
    //initialSelections 예시
    // {
    //   '직무': [],
    //   '경력': [],
    //   '기업 형태': [],
    //   '내 상태 태그 (복수 선택 가능)': []
    // }
    setSelections(initialSelections);
  }, []); // 실제 API 연동 시 이 useEffect는 제거

  const handleSelection = (section: string, item: string) => {
    const sectionConfig = sectionData.find(d => d.keyword === section);
    
    setSelections(prev => {
      if (sectionConfig?.isMultiSelect) {
        return {
          ...prev,
          [section]: prev[section].includes(item)
            ? prev[section].filter(i => i !== item)
            : [...prev[section], item]
        };
      }
      return {
        ...prev,
        [section]: [item]
      };
    });
  };

  const handleNext = () => {
    // 다음 단계 처리 로직
    const allData = {
      nickname,
      selectedCharacter,
      selectedColor,
      job: selections.job[0], // 단일 선택이므로 첫 번째 값만 사용
      personalHistory: selections.personalHistory[0], // 단일 선택이므로 첫 번째 값만 사용
      corporateForm: selections.corporateForm[0], // 단일 선택이므로 첫 번째 값만 사용
      myStatus: selections.myStatus, // 복수 선택 가능한 배열 그대로 사용
      profileImage: profileImage
    };
    //localStorage.setItem('userData', JSON.stringify(allData));
  
  // 다음 페이지로 이동하면서 데이터 전달
    navigate('/interest-select', {  // 실제 이동할 경로로 수정 필요
      state: allData
    });
    console.log('Selected values:', selections);
  };
  // 각 섹션의 표시 여부를 결정하는 함수
  const shouldShowSection = (index: number): boolean => {
    if (index === 0) return true; // 첫 번째 섹션은 항상 표시
    
    // 이전 섹션의 선택 여부 확인
    const previousSection = sectionData[index - 1];
    if (!previousSection) return false;
    
    const previousSelections = selections[previousSection.keyword] || [];
    return previousSelections.length > 0 && shouldShowSection(index - 1);
  };
  // 모든 섹션이 선택되었는지 확인
  const isAllSectionsSelected = (): boolean => {
    return sectionData.every(section => { //모든 결과가 true여야 true반환
      const sectionSelections = selections[section.keyword] || [];
      return sectionSelections.length > 0;
    });
  };
//   const selections = {
//     '직무': ['기획/PM'],
//     '경력': ['신입-2년'],
//     '기업 형태': []  // 아직 선택 안됨
// };

// // every 메서드의 실행 과정
// // 1번째 요소 검사
// section = { title: '직무' }
// sectionSelections = selections['직무']  // ['기획/PM'] 이런식으로 모든 section이 선택되었는지 검사함
  // 섹션들의 표시 여부와 버튼 활성화 상태
  const visibleSections = sectionData.map((_, index) => shouldShowSection(index));
  const isNextButtonActive = isAllSectionsSelected();


  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="w-[360px] min-h-screen h-full relative">
        {/* Header - fixed를 absolute로 변경 */}
        <div className="absolute top-[24px] w-full h-[48px] px-3 flex items-center justify-between">
          <div className='w-[24px] h-[24px] gap-[8px]'>
            <button className="text-2xl" onClick={handleGoBack}>
              <img src={ic_arrow_left} className='w-[24px] h-[24px]' alt="back"/>
            </button>
          </div>
        </div>
        <div className="absolute top-[104px] left-[16px] text-[#212121] ">
            <div>
                <h1 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] mb-1">닉네임최대열글자님에 대해</h1>
                <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px]">알려주세요!</h2>
            </div>
        </div>
        {/* Progress Indicator */}
        <div className="absolute top-[138px] right-4 w-[20px] h-[18px] font-bold text-[14px] leading-[18.2px] text-right tracking-tighter">
          <span className="text-black">2</span>
          <span className="text-[#BDBDBD]">/3</span>
        </div>
      {/* Content */}
      <div className='absolute w-[328px] h-[586px] top-[192px] left-[16px] gap-[32px]'>
        {sectionData.map((section, index) => (
          visibleSections[index] && (
            <JobSelect
              key={section.keyword}
              data={section}
              selectedItems={selections[section.keyword]}
              onSelect={(item) => handleSelection(section.keyword, item)}
            />
          )
        ))}
      </div>
      {/* Footer */}
      <div className="absolute bottom-0 w-[360px] h-[80px] top-[812px]">
        <button 
        onClick={handleNext} 
        className={`absolute top-[16px] left-[16px] w-[328px] h-[48px] rounded-lg px-[70px] py-[15px]  flex items-center justify-center bg-[#BDBDBD]} 
          ${isNextButtonActive ? 'bg-black' : 'bg-[#BDBDBD]'
          }`}
        >
          <span className='text-white text-center font-medium text-sm leading-[19.6px] tracking-[-0.35px]'>다음</span>
        </button>
      </div>
    </div>
    </div>
  );
};

export default JobSelection;