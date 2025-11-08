import axios from "axios";


function getHeaders() {
    const token = localStorage.getItem("token");
    return {
        token: `3b8ny__${token}`,
    };
}

export async function addNote(data) {

    try {
        const res = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, data, {

            headers : getHeaders() 
        });


        return res.data;
    } catch (err) {
        throw err.message

    }


}



export async function getUserNotes() {

    try {
        const res = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
            headers : getHeaders()
        });
        return res.data;
    } catch (err) {
        throw err.message

    }


}



export async function updateNote(noteId, data) {


    try {
        const res = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, data, {
            headers : getHeaders()
        });
        return res.data;
    } catch (err) {
        throw err.message

    }

}


export async function daleteNote(noteId) {


    try {
        const res = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
            headers : getHeaders()
        });
        return res.data;
    } catch (err) {
        throw err.message

    }

}





