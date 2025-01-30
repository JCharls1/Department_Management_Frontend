'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';



export default function DepartmentCard(props) {

    const router = useRouter();

    async function deleteDepartment(){

        await fetch('http://127.0.0.1:5000/api/department', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                department_name: props.department_name
            }),
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
        <div className="flex justify-center ">
            <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.department_name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ID: {props.departmentID}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
                <Link 
                href={`/CheckEmployees/${props.department_name}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                
                >
                    Check Employees
                    <svg 
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 14 10"
                    >
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </Link>
                <button 
                    className="m-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={deleteDepartment}
                >
                    Delete department
                </button>
            </div>
        </div>
    );
}
