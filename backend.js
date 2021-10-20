function requestAPICall() {

    //my accounts API key. DO NOT READ, GOT IT?
    //from exchangerate-api.com
    superSecretAPIKey = "19c59d36d7505ac876877aa7"

    //Sets API string in advance
    APIurl = `https://v6.exchangerate-api.com/v6/${superSecretAPIKey}/pair/`

    //Gives option to convert from any currency
    currencyFrom = document.getElementById("currencyFrom").value.toUpperCase() //prompt("What currency would you like to convert from?").toUpperCase()

    //Gives option to convert to any currency
    currencyTo = document.getElementById("currencyTo").value.toUpperCase() //"JPY"

    //Asks how much they would like to convert
    amountConverting = document.getElementById("amountConverting").value.toUpperCase().replace(',', '') //prompt("How much of this currency would you like to convert?").replaceAll(',', '');

    //validate inputs
    while (!/^[0-9]+$||^[0-9]+.[0-9]+$/.test(amountConverting)) {
        alert("You did not enter a properly formatted number.")
        return
    }

    //Update API url with parameters
    APIurl += `${currencyFrom}/${currencyTo}/${amountConverting}/`

    //API request
    callAPI(APIurl)

}

async function callAPI(APIurl) {
    try {
        //call API
        APIResponse = await fetch(APIurl)
        response = await APIResponse.json()

        //send error alert
        if (response["result"] == "error") {
            alert("Could not validate inputted currency")
            return
        }

        //edit webpage to display values
        document.getElementById("exchangeRate").value = response["conversion_rate"]
        document.getElementById("convertedAmount").value = response["conversion_result"]
    } catch (error) {
        //ensure no crashes when calling API
        alert("Error: Could not reach currency exchange API")
    }
}