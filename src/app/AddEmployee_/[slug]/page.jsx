'use client'

import { useRouter } from 'next/navigation';
import { getDepartments } from '@/utils/getDepartments';

export default function Page() {
    const router = useRouter();

    // Step 1: Function to add employee to department
    async function addEmployeeToDepartment(event) {
        event.preventDefault(); // Prevent default form submission

        // Step 2: Get input values
        const departmentName = event.target.department_name.value;
        const employeeId = event.target.employee_id.value;
        const employeeName = event.target.employee_name.value;
        const employeeEmail = event.target.employee_email.value;
        const employeeStatus = event.target.employee_status.value;

        // Step 3: Prepare request data
        const requestData = {
            department_name: departmentName,
            employee: {
                id: employeeId,
                name: employeeName,
                email: employeeEmail,
                status: employeeStatus,
            }
        };

        // Step 4: Send POST request
        await fetch('https://flask-backend-department.vercel.app/api/department/add_employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            router.push('/');
            // Handle the response (e.g., display a success message)
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle the error (e.g., display an error message)
        });
    }

    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <form id="departmentForm" onSubmit={addEmployeeToDepartment}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="department_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Department Name:
                        </label>
                        <input
                            type="text"
                            id="department_name"
                            name="department_name"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="employee_id"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Employee ID:
                        </label>
                        <input
                            type="text"
                            id="employee_id"
                            name="employee_id"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
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
                            htmlFor="employee_email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Employee Email:
                        </label>
                        <input
                            type="email"
                            id="employee_email"
                            name="employee_email"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="employee_status"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Employee Status:
                        </label>
                        <select
                            id="employee_status"
                            name="employee_status"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 hover:bg-green-700"
                    >
                        Add Employee to Department
                    </button>
                </div>
            </form>
        </div>
    );
}
