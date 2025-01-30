export async function getEmployeesFromDepartment(department) {
    const res = await fetch(`https://flask-backend-department.vercel.app/api/department/employees?department_name=${department}`, { cache: "no-store" }); // Prevents caching if you want fresh data
    if (!res.ok) {
        throw new Error("Failed to fetch departments");
    }
    return res.json();
}