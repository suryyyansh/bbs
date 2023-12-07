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
        
        if(response.status == 200) {
            optgenerated = true;
            const json = await response.json();
            const otp = json.otp;
            console.log("otp: ",otp);
            setVisibleOTP(otp);

        }
    } catch (error) {
        console.log("error: ",error);
    } finally{
        console.log("otp generated", optgenerated);
    }
}