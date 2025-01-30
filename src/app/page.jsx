
import Sidebar from "@/components/Sidebar";
import DepartmentCardList from "@/components/Department/DepartmentCardList";

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col  gap-8 row-start-2 items-center sm:items-start">
      <Sidebar />
      <div className="flex justify-center w-full">
        <div className="flex flex-col  gap-8 row-start-2 items-center p-10 ">
          <h1>Departments</h1>
          <DepartmentCardList />
        </div>
      </div>  
      </main>
    </div>
  );
}
