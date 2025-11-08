import axios from "axios";

export async function sendSignInData(userDate) {
        try {

                const res = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, userDate);

                console.log(res.data);
                return res.data;
        } catch (err) {
                console.log(err);
                throw err.message;
        }


}










