export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Only GET method is accepted" });
        }

        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }

        let token = await getAccessToken();
        token = token["access_token"];
        
        const url = `https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${latitude}&longitude=${longitude}`;

        async function fetchAirportData(url) {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // waits until the request completes...
            const jsonResponse = await response.json();

            return jsonResponse;
        }

        const response = await fetchAirportData(url);
        //console.log(response)
        //console.log('Token value:', token)
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching airport data" });
    }
}

async function getAccessToken() {
    //console.log(`grant_type=client_credentials&client_id=${process.env.amadeus_key}&client_secret=${process.env.amadeus_secret}`);
    const promise = new Promise((res, rej) => {
        fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=client_credentials&client_id=${process.env.amadeus_key}&client_secret=${process.env.amadeus_secret}`,
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    //console.log(await response.json())
                    throw new Error("Request failed.");
                }
            })
            .then(res)
            .catch((error) => {
                console.error(error);
            });
    });
    return promise;
}
