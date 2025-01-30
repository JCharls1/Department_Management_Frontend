export async function getDepartments() {
    const res = await fetch("http://127.0.0.1:5000/api", { cache: "no-store" }); // Prevents caching if you want fresh data
    if (!res.ok) {
        throw new Error("Failed to fetch departments");
    }
    return res.json();
}