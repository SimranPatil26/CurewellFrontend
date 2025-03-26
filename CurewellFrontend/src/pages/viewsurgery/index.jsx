import Viewspec from "../../components/viewspec";
import Navbar from "../../components/navbar";
import ViewSurgery from "../../components/viewsurgeries";
const ViewSurgeryPage = () =>
    {
        return(
            <div style={{backgroundColor:"#a2c1c2",minHeight: "100vh"}}> 
            <Navbar />
            <ViewSurgery />
            </div>
            
           
        )
    }
    
    export default ViewSurgeryPage;