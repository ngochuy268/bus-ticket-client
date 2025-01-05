import axios from 'axios';

export const mailModel = async (formData, captchaToken) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-email`,{...formData, captchaToken});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('メールの取得中にエラーが発生しました:', error);
        return null;
    }
}