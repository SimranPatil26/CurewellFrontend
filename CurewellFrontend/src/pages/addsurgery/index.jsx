import Navbar from "../../components/navbar";
import AddDoc from "../../components/adddoc";
import AddSurgery from "../../components/addsurgery";
const AddSurgeryPage = () =>
    {
        return(
            <div style={{backgroundColor:"#a2c1c2",minHeight: "100vh"}}>
            <Navbar />
            <AddSurgery />
            </div>
            
           
        )
    }
    
export default AddSurgeryPage;