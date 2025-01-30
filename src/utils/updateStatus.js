export async function updateStatus(departmentName, employeeName, status){
    const requestData = {
        department_name: departmentName,
        employee_name: employeeName,
        status: status
    }

    console.log(requestData);
    await fetch('http://127.0.0.1:5000/api/department/employee/status', {
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