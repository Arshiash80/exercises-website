import axios from "axios";
class NetworkManager<T> {

    constructor(public options: INetworkRequestOptions<T>) {

    }

    /**
     * Axioos request with provided options `INetworkRequestOptions<T>`
     * @returns 
     */
    async request<R>(): Promise<R> {
        return new Promise(async (resolve, rejects) => {
            try {
                const response = await axios.request(this.options)
                resolve(response.data)
            } catch (error) {
                console.log("ERROR", error)
                rejects(error)
            }
        })
    }


}


export default NetworkManager