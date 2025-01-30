import FileUploader from "@/components/FileUploader";
import Sidebar from "@/components/Sidebar";

export default function page(){
    return(
        <div>
            <Sidebar></Sidebar>
            <FileUploader></FileUploader>
        </div>
    );
}