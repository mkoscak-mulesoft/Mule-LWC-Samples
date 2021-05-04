/* eslint-disable no-console */

export default function fetchDataHelper( muleURI, externalField, muleURIExtended ) {
    let calloutURI = muleURI;
    if(externalField != null && externalField){
        calloutURI += externalField;
    }
    if(muleURIExtended != null && muleURIExtended){
        calloutURI = calloutURI + muleURIExtended;
    }
    console.log('Executing callout to ' + calloutURI);

    // execute callout and process data
    return fetch(calloutURI, {
        method: 'GET',
        mode:'cors'
    }).then((response) => {
        return response.json();
    }).then((obj) => {
        let data = [];
        for (let rowIndex in obj) {
            let row = obj[rowIndex];
            let record = {};
            for(let field in row ){
                if(field == 'name' || field == 'rating' || field == 'phone' || field == 'price'){
                    record[field.charAt(0).toUpperCase() + field.slice(1)] = row[field];
                }
            }
            data.push(record);
        }
        return data;
    });
}