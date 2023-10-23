const axios = require('axios');

async function GetExternalData(topic) {
    let generatedText = "";

    try {
        // Base data structure
        let dataObj = {
            "context": "joke"
        };

        // If topic exists, add it to the dataObj
        if (topic) {
            dataObj.topic = topic;
        }

        // Convert the object to JSON string
        let data = JSON.stringify(dataObj);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://0.0.0.0:8000/generate-text',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);
        generatedText = JSON.stringify(response.data);
    } catch (error) {
        console.error('Error calling the Sanic server:', error.message);
        return "Error fetching data"; // You can return an error message if needed
    }

    return generatedText;
}

module.exports = {
    GetExternalData
};
