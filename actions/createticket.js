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
        
        console.log("statustext: ", response.statusText);
        if(response.statusText === "OTP GENERATED") {
            optgenerated = true;
            const json = await response.json();
            const otp = json.otp;
            console.log("otp: ",otp);
            setVisibleOTP(otp);            
        } else if (response.statusText === "UNAUTHORIZED TO RIDE"){
            console.log("User UNAUTHORIZED to ride. OTP generation rejected.")
            setVisibleOTP("UNAUTHORIZED OR INSUFFICIENT FUNDS");
        }
    } catch (error) {
        console.log("error: ",error);
    } finally{
        console.log("otp generated", optgenerated);
    }
}