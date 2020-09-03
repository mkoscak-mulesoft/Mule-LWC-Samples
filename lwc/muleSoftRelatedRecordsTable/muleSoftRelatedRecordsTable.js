/* eslint-disable no-console */
import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import fetchDataHelper from './muleSoftRelatedRecordsTableHelper.js';

export default class MuleRelatedRecordsTable extends LightningElement {
    @api recordId; // automatically store record id current record

    @track data = []; // store data returned from callout to display
    @track columns; // variable to dynamically store column headers
    @track isLoaded = true; // spinner boolean

    @api cardTitle; // variable storing the title on the card
    @api muleURIBase; // mulesoft endpoint URI base
    @api muleURIExtended; // additional string to go after passing in a record id
    @api passRelatedRecord; // checkbox allows user to pass related id or not
    @api relatedRecordId; // API field name of the related record id
    @api objectApiName; // API name of the object the page is on

    externalFieldName = ['Id']; // default value for query so wiredRecord doesn't error initially

    // async function to execute callout to mule endpoint
    async executeCallout(externalField){
        if(this.muleURIBase == null || this.muleURIBase == ''){
            return;
        }
        let result = await fetchDataHelper(this.muleURIBase, externalField, this.muleURIExtended);
        
        // extract column headers dynamically from first record
        let cols = [];
        let record = result[0];
        for (let field in record){
            cols.push({
                label: field,
                fieldName: field
            });
        }
        this.columns = cols;
        this.data = result;
        this.isLoaded = false;
    }

    // wire function 
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