/* eslint-disable no-console */

export default function fetchDataHelper( muleURI, externalField, muleURIExtended) {
    let calloutURI = muleURI;
    if(externalField != null && externalField){
        calloutURI += externalField;
    }
    if(muleURIExtended != null && muleURIExtended){
        calloutURI += muleURIExtended;
    }
    console.log('Executing callout to ' + calloutURI);

    // execute callout and process response
    return fetch(calloutURI, {
        method: 'GET',
        mode:'cors'
    }).then((response) => {
        return response.json();
    }).then((obj) => {
        let results = [];
        for (let prop in obj) {
            if (!obj.hasOwnProperty(prop)) continue;
            // append key and value to array
            let val = obj[prop];
            if(val == null){
                val = '';
            }
            results.push({
                key: prop,
                value: String(val)
            })
        }
        return results;
    });
}