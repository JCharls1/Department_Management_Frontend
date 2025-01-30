// "use client";
import Sidebar from "@/components/Sidebar";
import EmployeeCard from "@/components/Employees/EmployeeCard";
import AddEmployee from "@/components/Employees/AddEmployee";
import { getEmployeesFromDepartment } from "@/utils/getEmployeesFromDepartment";

// async function getEmployees(department_name){
//     const res = await fetch(`http://127.0.0.1:5000/api/department/employees?department_name=${department_name}`);
//     if(!res.ok)
//         throw new Error("failed to fetch employees");
//     return res.json();
// }

export default async function page({params}){
    const { slug } = await params;
    const data = await getEmployeesFromDepartment(slug);
    console.log(data)

    return(
        <div>
            <main className="flex flex-col  gap-8 row-start-2 items-center sm:items-start">
                <Sidebar />
                <div className="flex justify-center w-full ">
                    <div className="flex flex-col gap-8 row-start-2 items-center  w-3/4 p-4">
                        <h1>Department: {slug}</h1>
                        <div className="w-full max-h-[556px] overflow-y-auto border border-gray-300 p-2 flex flex-col items-center">
                            {data.employees.map(employee => (
                                <div key={employee.employee_id} className="w-full flex justify-center p-1">
                                    <EmployeeCard department_name={slug} name={employee.name} email={employee.email} status={employee.status} employee_id={employee.employee_id} />
                                </div>
                            ))}
                        </div>
                        <div className="w-full max-h-[556px] overflow-y-auto border border-gray-300 p-2 flex flex-col items-center">
                            <h1>Add an employee</h1>
                            <AddEmployee department_name={slug} /> 
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}