export async function ValidateTicket(data, setValidity){

   try {
        const response = await fetch('/api/conductor/verifyotp', {
            method: 'POST',
            body: JSON.stringify({
                otp: data.get("otp")
            })
        })
        var json = await response.json();
        if(json.validity === "VALID") {
            setValidity("VALID");
        } else{
            setValidity("INVALID");
        }
    } catch (error) {
        console.log("error: ",error);
    }
}