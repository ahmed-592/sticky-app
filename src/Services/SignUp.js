import axios from "axios";

export async function sendSignUpData(userDate) {

    try {
        const res = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, userDate);

        console.log(res.data.msg);
        return res.data.msg;
    } catch (err) {
        console.log(err.message);
        throw err.message;
    }
}










