import axios from 'axios';
import { StudentActivityDto } from '../DTOs/StudentActivity';
import { ActivityTypes } from '../Enums/ActivityTypes';

// Define the type of data the API expects
const HOST_ADDRESS = 'https://students-activities-api.azurewebsites.net';
//const HOST_ADDRESS = 'https://localhost:7098';
// Function to send the student ID to the backend
export const saveStudentActivity = async (data: StudentActivityDto) => {
    try{
        console.log("Data to send: ",data);
        const response = await axios.post(`${HOST_ADDRESS}/api/Activity/${data.activityId}/Students/${data.studentId}`, data);
        return response.data; // Return the API response        
    }
    catch(error){
        console.error("Error saving student activity:", error);    
        return []; // Return an empty array to avoid crashes    
    }
};

export async function fetchStudentsByActivity(activityId : number) {
    try {
        const response = await axios.get(`${HOST_ADDRESS}/api/Activity/${activityId}/Students`);
        return response.data; // Return the todos directly
    } catch (error) {        
        console.error("Error fetching todos:", error);
        return []; // Return an empty array to avoid crashes
    }
}

export async function fetchCurrentActivityId() {
    try {
        const response = await axios.get(`${HOST_ADDRESS}/api/Activities/${ActivityTypes.Attendance}`);
        console.log("Response: ",response.data);
        return response.data; // Return the todos directly
    } catch (error) {
        console.error("Error fetching todos:", error);
        return []; // Return an empty array to avoid crashes
    }
}