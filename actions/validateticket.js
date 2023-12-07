export async function ValidateTicket(data, setValidity, setAmount){

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
            console.log(json.amount);
            setAmount(Number(json.amount));
        } else{
            setValidity("INVALID");
        }
    } catch (error) {
        console.log("error: ",error);
    }
}