export async function addDepartment(department_name, department_description) {
    // event.preventDefault(); // Prevent default form submission

    // Step 2: Get input values
    const departmentName = department_name;
    const description = department_description;

    // Step 3: Prepare request data
    const requestData = {
        department_name: departmentName,
        description: description,
        employees: [], // Always empty as per your requirements
    };

    // Step 4: Send POST request
    await fetch('https://flask-backend-department.vercel.app/api', {
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