'use client'

import Link from "next/link";
import { updateStatus } from "@/utils/updateStatus";


export default function EmployeeCard(props){
    const handleChangeStatus = async () => {
        const departmentName = props.department_name;
        const employeeName = props.name;
        const status = props.status == "Active" ? "Inactive" : "Active"; // You can change this as needed, for example 'Active', 'Inactive', etc.
        
        // Call the updateStatus function
        await updateStatus(departmentName, employeeName, status);
        window.location.reload();
    };

    return(
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Employee ID: {props.employee_id}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.email}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.status}</p>
            <Link href={`/EditEmployee/${props.name}/${props.email}/${props.department_name}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Edit Information
            </Link>
            <button onClick={handleChangeStatus} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Change Status
            </button>
        </div>
    );
}
