import DepartmentCard from "./DepartmentCard";
import AddDepartment from "./AddDepartment";
import { getDepartments } from "@/utils/getDepartments";

export default async function DepartmentCardList() {
    const data = await getDepartments();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {data.map((department) => (
                <div key={department._id} className="w-full max-w-sm">
                    <DepartmentCard department_name={department.department_name} description={department.description} departmentID={department._id}/>
                </div>
            ))}
            <div className="w-full max-w-sm flex justify-center items-center mx-auto">
                <AddDepartment  />
            </div>

            
        </div>
    );
}


