import Navbar from "../../components/navbar";
import AddDoc from "../../components/adddoc";
import AddSurgery from "../../components/addsurgery";
import AddSpecialisation from "../../components/addspec";
const AddSurgeryPage = () =>
    {
        return(
            <div style={{backgroundColor:"#a2c1c2",minHeight: "100vh"}}>
            <Navbar />
            <AddSpecialisation />
            </div>
            
           
        )
    }
    
export default AddSurgeryPage;