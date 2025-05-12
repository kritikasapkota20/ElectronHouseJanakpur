import axios from "axios";
import Cookies from "js-cookie";

const config = {
    headers: {
        "user-token": Cookies.get("user-token"),
    },
};

const handleApiRequest = async (method, targetPath, data = null, auth = true) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/${targetPath}`;
    let response;
    switch (method) {
        case "GET":
            response = await axios.get(url, auth ? config : null);
            break;

        case "POST":
            response = await axios.post(url, data, auth ? config : null);
            break;

        case "PUT":
            response = await axios.put(url, data, auth ? config : null);
            break;

        case "DELETE":
            response = await axios.delete(url, auth ? config : null);
            break;

        default:
            throw new Error("Invalid method.");
    }

    return response.data;
};

export default handleApiRequest;
