import env from '../env';
import { IFormValues } from './interfaces'

export const apiCall = async (
    endpoint: string,
    data: IFormValues
) => {
    return window.fetch(`${env.url}:${env.port}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (response.ok) {
            const dataBlob = await response.blob()
            const dataResponse = window.URL.createObjectURL(dataBlob);
            var link = document.createElement('a');
            link.href = dataResponse;
            link.download = `${data.name || "myWeb"}.pdf`;
            link.click();
            // For Firefox it is necessary to delay revoking the ObjectURL
            setTimeout(function () {
                window.URL.revokeObjectURL(dataResponse);
            }, 100);
            return dataResponse
        } else {
            return response.json()
        }
    })
    .catch(error => Promise.reject(error))
}