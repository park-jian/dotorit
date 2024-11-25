// CharacterContent.tsx
import React from 'react';

interface CharacterContentProps {
  onCharacterSelect: (character: string) => void;
  onColorSelect: (color: string) => void;
  selectedCharacter?: string;
  selectedColor?: string;
}

export const CharacterContent: React.FC<CharacterContentProps> = ({
  onCharacterSelect,
  onColorSelect,
  selectedCharacter,
  selectedColor
}) => {
  const characters = ['img_profile', 'img_profile2', 'img_profile3', 'img_profile4'];
  const colors = ['#DFD8D8', '#FFD79F', '#F6B3B3', '#BADFBB', '#B1C1EA', '#DBCBF1'];

  return (
    <>
      <div className="mb-6">
        <div className="font-medium text-sm leading-[19.6px] tracking-[-0.025em] text-[#424242] mb-2 flex items-center">
          <div className='w-[16px] h-[16px] rounded-full bg-[#757575] text-white text-center mr-2'>1</div> 
          <span>디렉터를 선택해주세요</span>
        </div>
        <div className="flex gap-4">
          {characters.map(char => (
            <button
              key={char}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedCharacter === char ? 'border-2 border-orange-500' : ''
              }`}
              onClick={() => onCharacterSelect(char)}
            >
              <img src={`${char}.png`} alt={char} className="w-10 h-10" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-medium text-sm leading-[19.6px] tracking-[-0.025em] text-[#424242] mb-2 flex items-center">
          <div className='w-[16px] h-[16px] rounded-full bg-[#757575] text-white text-center mr-2'>2</div>
          <span>배경 컬러를 선택해주세요</span>
        </div>
        <div className="flex gap-4">
          {colors.map(color => (
            <button
              key={color}
              className={`w-[36px] h-[36px] rounded-full ${
                selectedColor === color ? 'border-2 border-[#FF6A00]' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
            />
          ))}
        </div>
      </div>
    </>
  );
};