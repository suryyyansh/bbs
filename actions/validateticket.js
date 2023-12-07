export async function ValidateTicket(data, setValidity){

   try {
        const response = await fetch('/api/conductor/verifyotp', {
            method: 'POST',
            body: JSON.stringify({
                otp: data.get("otp")
            })
        })
        
        if(response.statusText === "VALID") {
            setValidity("VALID");
        }
        if(response.statusText === "INVALID"){
            setValidity("INVALID");
        }
    } catch (error) {
        console.log("error: ",error);
    }
}