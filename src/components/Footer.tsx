interface FooterButtonPropsProps {
    actionButton?: {
      text: string;
      onClick: () => void;
      disabled?: boolean;
    };
  }

const Footer = ({ actionButton}: FooterButtonPropsProps) => {
    return (
      <>
        {actionButton && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
              <div className="px-4 py-4">
                <button
                  className="w-full h-[50px] bg-[#FF6B2C] text-white rounded text-[15px] font-medium disabled:opacity-50"
                  onClick={actionButton.onClick}
                  disabled={actionButton.disabled}
                >
                  {actionButton.text}
                </button>
              </div>
            </div>
          )}
      </>
    );
}
export default Footer;