import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { verifyAdmin } from "../services/admin";

function Verify(){

    const { id } = useParams()
    useEffect(() => {
        async function loadData(){
            const response = await verifyAdmin(id);
            if( response ){
                window.location = '/home';
            }
        }
        loadData();
    }, [])
    

    return(
        <>
        </>
    )
}
export default Verify;