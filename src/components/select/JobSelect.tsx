import React from 'react';

export interface SelectionData {
  title: string;
  items: string[];
  keyword: string;
  isMultiSelect?: boolean;
}

interface JobSelectProps {
  data: SelectionData;
  selectedItems: string[];
  onSelect: (item: string) => void;
}

const JobSelect: React.FC<JobSelectProps> = ({ data, selectedItems, onSelect }) => {
  const renderTitle = (title: string) => {
    const parts = title.split(`(복수 선택 가능)`);
    if (parts.length === 1) {
        return (
            <span className="font-bold text-sm leading-[18.2px] tracking-tighter text-[#616161]">
                {title}
            </span>
        )
    }
    return (
        <span className="font-bold text-sm leading-[18.2px] tracking-tighter text-[#616161]">
            {parts[0]}
            <span className="font-medium text-[14px] leading-[19.6px] tracking-[-0.025em] text-[#BDBDBD]">
                (복수 선택 가능)
            </span>
        </span>
    )
  }

  return (
    <section className="mb-6">
      {renderTitle(data.title)}
      <div className="flex flex-wrap gap-2 mt-2">
        {data.items.map(item => (
          <button
            key={item}
            className={`rounded-md px-2.5 py-1.5 text-sm ${
              selectedItems.includes(item) 
                ? 'bg-black text-white' 
                : 'bg-white border border-[#E0E0E0] text-gray-500'
            }`}
            onClick={() => onSelect(item)}
          >
            <span className="font-medium leading-[19.6px] tracking-tighter">
              {item}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default JobSelect;