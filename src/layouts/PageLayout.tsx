// components/layout/PageLayout.tsx
import React from 'react';
// import { IoChevronBackOutline } from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
  onBack?: () => void;
  actionButton?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    footerClass?: string;
    textClass?: string;
  };
  headerButton?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    headerClass?: string;
    textClass?: string;
  };
}

const PageLayout = ({ title, children, onBack, actionButton, headerButton }: PageLayoutProps) => {
  return (
    <div className="relative max-w-md mx-auto h-full overflow-x-hidden"> 
    {/* min-h-screen */}
      {/* Header */}
      <Header title={title} onBack={onBack} headerButton={headerButton}/>
      {/* Main Content */}
      {/* <div className="px-4 pb-24 pt-12"> */}
        {children}
      {/* </div> */}

      {/* Bottom Button */}
      <Footer actionButton={actionButton }/>
    </div>
  );
};

export default PageLayout;