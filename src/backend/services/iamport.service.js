const axios = require('axios')
require('dotenv').config();
const env = process.env;
class IamportService {
    async getToken() {
        try {
            const result = await axios.post(
                'https://api.iamport.kr/users/getToken',
                {
                    imp_key: env.IAMPORT_KEY,
                    imp_secret: env.IAMPORT_SECRET,
                },
            );
            return result.data.response.access_token; // 토큰값
        } catch (error) {
            return { errorMessage: error }
        }
    }

    async checkPaid({ impUid, amount, token }) {
        try {
            const result = await axios.get(
                `https://api.iamport.kr/payments/${impUid}`,
                {
                    headers: { Authorization: token },
                },
            );
            if (result.data.response.status !== 'paid') {
                return { errorMessage: '결제내역이 존재하지 않습니다' }
            }
            if (result.data.response.amount !== parseInt(amount)) {
                return { errorMessage: '결제 금액이 잘못됐네용' }
            }
        } catch (error) {
            return { errorMessage: error }
        }
    }

    async cancel({ impUid, token }) {
        try {
            const result = await axios.post(
                'https://api.iamport.kr/payments/cancel',
                {
                    imp_uid: impUid,
                },
                {
                    headers: { Authorization: token },
                },
            );
            return result.data.response.cancel_amount;
        } catch (error) {
            return { errorMessage: "결제 취소 에러입니다" }
        }
    }
}

module.exports = IamportService