export async function addEmployeeToDepartment(department_name, employee_id, employee_name, employee_email, employee_status) {
    // event.preventDefault(); // Prevent default form submission

    // Step 2: Get input values
    const departmentName = department_name;
    const employeeId = employee_id;
    const employeeName = employee_name;
    const employeeEmail = employee_email;
    const employeeStatus = employee_status;

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
    await fetch('http://127.0.0.1:5000/api/department/add_employee', {
        method: 'POST',
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