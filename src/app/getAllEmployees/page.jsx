import { getDepartments } from "@/utils/getDepartments";
import EmployeeCard from "@/components/Employees/EmployeeCard"; // Import the EmployeeCard component
import Sidebar from "@/components/Sidebar";

export default async function Page() {
    const data = await getDepartments();
    
    // Extracting all employees from all departments
    const allEmployees = data.reduce((acc, department) => {
        return acc.concat(department.employees); // Concatenate the employees of each department
    }, []);

    return (
        <div>
            <main className="flex flex-col  gap-8 row-start-2 items-center sm:items-start">
                <Sidebar />
                <div className="flex justify-center w-full ">
                    <div className="flex flex-col gap-8 row-start-2 items-center  w-3/4 p-4">
                        <div className="w-full max-h-[556px] overflow-y-auto border border-gray-300 p-2 flex flex-col items-center">
                            <h1>All Employees</h1>
                                {allEmployees.map((employee) => (
                                    <EmployeeCard
                                        key={employee.employee_id}
                                        name={employee.name}
                                        email={employee.email}
                                        status={employee.status}
                                        department_name={employee.department_name || "Unknown"} // Assuming each employee has a department_name, else default to "Unknown"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
                   
        // <div>
        
        // </div>
    );
}
