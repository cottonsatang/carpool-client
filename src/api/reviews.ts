const postReview = async (matchId: number, rating: number) => {
    try {
        // JWT 토큰 가져오기
        const accessToken = await getEncryptStorage('accessToken');
        console.log("accessToken:", accessToken); // 콘솔로 토큰 확인

        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await axios.post(
            'http://10.0.2.2:3000/reviews',
            { rideRequestId: matchId, rating },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // 토큰을 Authorization 헤더에 추가
                },
            }
        );
        console.log('리뷰 제출 성공:', response.data);
    } catch (error) {
        console.error('리뷰 제출 실패:', error);
        throw error;
    }
};
