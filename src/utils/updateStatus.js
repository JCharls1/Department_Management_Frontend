export async function updateStatus(departmentName, employeeName, status){
    const requestData = {
        department_name: departmentName,
        employee_name: employeeName,
        status: status
    }

    console.log(requestData);
    await fetch('https://flask-backend-department.vercel.app/api/department/employee/status', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
        // Handle the response (e.g., display a success message)
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle the error (e.g., display an error message)
    });
}