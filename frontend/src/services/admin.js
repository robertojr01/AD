import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;


//Create Admin
export async function registerAdmin(data){
    try {
        const response = await axios({
            url: `${baseUrl}/register_admin`,
            method: 'POST',
            data
        })
        return response;
    } catch (error) {
        return error.response;
    }
}
//Login Admin
export async function loginAdmin(data){
    try {
        const response = await axios({
            url: `${baseUrl}/login_admin`,
            method: 'POST',
            data
        })
        return response;
    } catch (error) {
        return error.response;
    }
}
//Get All Admins
export async function getAllAdmins(){
    try {
        const response = await axios({
            url: `${baseUrl}/get_admins`,
            method: 'GET'
        })
        return response;
    } catch (error) {
        return error.response;
    }
}
//Delete Admin
export async function deleteAdmin(id){
    try {
        const response = await axios({
            url: `${baseUrl}/delete_admin/${id}`,
            method: 'DELETE'
        })
        return response;
    } catch (error) {
        return error.response;
    }
}
//Verify Admin
export async function verifyAdmin(id){
    try {
        const response = await axios({
            url: `${baseUrl}/verify_admin/${id}`,
            method: 'GET'
        })
        return response;
    } catch (error) {
        return error.response;
    }
}