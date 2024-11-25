const AdditionalInfoPage: React.FC = () => {

    const { social } = useParams();
    const { state: socialData } = useLocation(); // 소셜 로그인 response data
    const socialSignup = useSocialAdditionalSignup();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        
        try {
            await socialSignup.mutate({
                socialData,    // 소셜 로그인에서 받은 정보
                additionalInfo: {
                    phoneNumber: formData.get('phoneNumber') as string,
                    address: formData.get('address') as string
                }
            });
        } catch (error) {
            console.error('추가 정보 등록 실패:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="phoneNumber" placeholder="전화번호" required />
            <input name="address" placeholder="주소" />
            <button type="submit">
                {socialSignup.isLoading ? '처리중...' : '가입완료'}
            </button>
        </form>
    );
};
export default AdditionalInfoPage;