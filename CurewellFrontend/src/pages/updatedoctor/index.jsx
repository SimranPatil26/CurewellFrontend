import Navbar from "../../components/navbar";
import AddDoc from "../../components/adddoc";
import UpdateDoc from "../../components/updatedoc";
const UpdateDocPage = () =>
    {
        return(
            <div style={{backgroundColor:"#a2c1c2",minHeight: "100vh"}}>
            <Navbar />
            <UpdateDoc />
            </div>
            
           
        )
    }
    
export default UpdateDocPage;