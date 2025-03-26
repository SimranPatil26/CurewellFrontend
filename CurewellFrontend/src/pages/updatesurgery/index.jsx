import Navbar from "../../components/navbar";
import UpdateSurgery from "../../components/updatesurgery";
import Viewdoctor from "../../components/viewdoc";
const UpdateSurgeryPage = () =>
    {
        return(
            <div style={{backgroundColor:"#a2c1c2",minHeight: "100vh"}}> 
            <Navbar />
            <UpdateSurgery />
            </div>
            
           
        )
    }
    
    export default UpdateSurgeryPage;