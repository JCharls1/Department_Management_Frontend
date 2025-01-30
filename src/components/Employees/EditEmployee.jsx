"use client"
import { useRouter } from 'next/navigation';

export default function EditEmployee(props){
    const router = useRouter();
    async function editEmployee(event){
        event.preventDefault();

        const updatedName = event.target.employee_name.value;
        const updatedEmail = event.target.email.value;

        const requestData = {
            department_name: props.department,
            employee_name: decodeURIComponent(props.name),
            updated_name: updatedName,
            updated_email: updatedEmail
        }
        console.log(requestData);
        await fetch('https://flask-backend-department.vercel.app/api/department/employee/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            router.push(`/CheckEmployees/${props.department}`);
            // Handle the response (e.g., display a success message)
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle the error (e.g., display an error message)
        });
        
        
    }
    return(
        <div>
            <h1>Edit</h1>
            <form id="departmentForm" onSubmit={editEmployee}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="employee_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Employee Name:
                        </label>
                        <input
                            type="text"
                            id="employee_name"
                            name="employee_name"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Employee Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 hover:bg-green-700"
                    >
                        Edit Employee Information
                    </button>
                </div>
            </form>
        </div>
    );
}