import EditEmployee from "@/components/Employees/EditEmployee";
import Sidebar from "@/components/Sidebar";

export default async function page({params}){
    const { slug } = await params;

    return(
        <div className="">
            <main className="flex flex-col  gap-8 row-start-2 items-center sm:items-start">
            <Sidebar />
            <div className="flex justify-center w-full">
                <div className="flex flex-col  gap-8 row-start-2 items-center p-10 ">
                    <EditEmployee name={slug[0]} department={slug[2]}/>
                    <h1>
                        {slug[0]}
                    </h1>
                </div>
            </div>
            </main>
        </div>
    );
}