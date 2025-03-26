import Navbar from "../../components/navbar";
import AddDoc from "../../components/adddoc";
import UpdateDoc from "../../components/updatedoc";
import UpdateSpecialisation from "../../components/updatespec";
const UpdateDocPage = () =>
    {
        return(
            <div style={{backgroundColor:"#a2c1c2",minHeight: "100vh"}}>
            <Navbar />
            <UpdateSpecialisation />
            </div>
            
           
        )
    }
    
export default UpdateDocPage;