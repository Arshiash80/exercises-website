interface INetworkRequestOptions<T> {
    /**
     * Request method.
     * Possible values `GET`, `POST`
     */
    method: 'GET' | 'POST'
    /**
     * Url of the api
     */
    url: string
    /**
     * Headers of the request
     */
    headers?: { [key: any]: string }

    /**
     * 
     */
    params?: { [key: any]: string | undefined }

    /**
     * Body of the request
     */
    data?: T
}

interface IRapidApiRequestOptions<T> extends Omit<INetworkRequestOptions<T>, 'headers'> {
    headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": string,
        "X-RapidAPI-Host": string,
    }
}
