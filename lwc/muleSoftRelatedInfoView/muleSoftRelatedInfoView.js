/* eslint-disable no-console */
import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import fetchDataHelper from './muleSoftRelatedInfoViewHelper';

// Columns for this table are key value pairs
const columns = [
    { label: 'Field', fieldName: 'key' },
    { label: 'Value', fieldName: 'value' }
];

export default class MuleSoftQueryRecord extends LightningElement {

    @api recordId; // automatically store record id of page

    @track data = []; // store data returned from callout to display
    @track columns = columns; // column headers
    @track isLoaded = true; // spinner boolean

    @api cardTitle;
    @api muleURIBase; // mulesoft endpoint URI
    @api muleURIExtended; // additional string to go after passing in a record id
    @api passRelatedRecord; // checkbox allows user to pass related id or not
    @api relatedRecordId; // API field name of the related record id
    @api objectApiName; // API name of the object the page is on

    externalFieldName = ['Id']; // default value for query so wiredRecord doesn't error initially

    async executeCallout(externalField){
        console.log('Beginning fetch function...');
        if(this.muleURIBase == null || this.muleURIBase == ''){
            console.log('No URI detected, abandoning callout');
            return;
        }
        this.data = await fetchDataHelper(this.muleURIBase, externalField, this.muleURIExtended);
        this.isLoaded = false;
    }

    // grabs the field info to pass dynamically to the callout
    @wire(getRecord, { recordId: '$recordId', fields: '$externalFieldName' })
    wiredRecord({ data, error }) {
        if (data) {
            this.record = [...Object.keys(data.fields).map(key => {
                return data.fields[key].value;
            })];
            this.error = undefined;
            this.executeCallout(this.record[0]);
        }
        else if (error) {
            console.log('Error retrieving record data in Salesforce...');
        } 
    }

    async connectedCallback() {
        // if passing field as related Id, query field storing the Id
        if(this.passRelatedRecord && this.relatedRecordId && this.relatedRecordId != ''){
            this.externalFieldName = this.objectApiName + '.' + this.relatedRecordId;
        }
        // if not passing field as related Id, execute Mule callout
        else{
            console.log('No field passed...');
            this.data = await fetchDataHelper(this.muleURIBase, '', '');
            this.isLoaded = false;
        }
    }
}