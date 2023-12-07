export async function CreateTicket(data, setVisibleOTP, email){

    var optgenerated = false;
   try {
        const response = await fetch('/api/user/generateotp', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                amount: data.get("amount")
            })
        })
        
        const json = await response.json();
        console.log("statustext: ", response.statusText);
        if(json.statusText === "OTP GENERATED") {
            optgenerated = true;
            const otp = json.otp;
            console.log("otp: ",otp);
            setVisibleOTP(otp);            
        } else if (json.statusText === "UNAUTHORIZED TO RIDE"){
            console.log("User UNAUTHORIZED to ride. OTP generation rejected.")
            setVisibleOTP("UNAUTHORIZED OR INSUFFICIENT FUNDS");
        }
    } catch (error) {
        console.log("error: ",error);
    } finally{
        console.log("otp generated", optgenerated);
    }
}