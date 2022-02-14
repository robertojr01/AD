import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

//Create - Edit Drone
export async function createDrone({ name, model, serialNumber, flightTime, status, image }){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('model', model);
    formData.append('serialNumber', serialNumber);
    formData.append('flightTime', flightTime);
    formData.append('status', status);
    formData.append('image', image);
    console.log({ name, model, serialNumber, flightTime, status, image })
    try {
        const response = await axios({
            url: `${baseUrl}/create_drone`,
            method: 'POST',
            data: formData
        })
        return response;
    } catch (error) {
        return error.response;
    }
}
//Get All Drones
export async function getAllDrones(){
    try {
        const response = await axios({
            url: `${baseUrl}/get_drones`,
            method: 'GET'
        })
        return response;
    } catch (error) {
        return error.response;
    }
}
//Get Drone By Id
export async function getDroneById(id){
    try {
        const response = await axios({
            url: `${baseUrl}/get_drone/${id}`,
            method: 'GET'
        })
        return response;
    } catch (error) {
        return error.response;
    }
}
//Delete Drone
export async function deleteDroneById(id){
    try {
        const response = await axios({
            url: `${baseUrl}/delete_drone/${id}`,
            method: 'DELETE'
        })
        return response;
    } catch (error) {
        return error.response;
    }
}
//Edit Drones Attribute By Select
export async function editDronesBySelects(data){
    console.log( data );
    console.log( baseUrl )
    try{
        const response = await axios({
            url: `${baseUrl}/edit_drones_by_select`,
            method: 'PUT',
            data
        })
        return response;
    }catch( error ){
        return error.response;
    }
}