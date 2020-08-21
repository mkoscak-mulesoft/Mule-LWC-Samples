<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

# MuleSoft Lightning Web Components

This repository contains code that can be used to demonstrate how Salesforce Lightning Web Components can be used as a frontend for APIs delivered with Mule.  Currently there are 2 generic components for demonstration:<br/>
	1) Related Info View (Single Record)<br/>
		- Use this to display a table of key value pairs.  This is best for displaying a single related record or a list of related information.<br/>
	2) Related Table View (Multi/Child Records)<br/>
		- Use this to display a table of related values.  This is best for displaying a list of related records.<br/>
<br/>

## Installation & Configuration
1) Use the Deploy to Salesforce button on this page to install the Lightning Web Components into your Salesforce instance.
2) Ensure my domain is turned on.  https://help.salesforce.com/articleView?id=domain_name_overview.htm&type=5
3) Create CSP Trusted Sites (Note: this step takes 15-45 minutes to kick in after enabled. There is no alert).  In Salesforce Setup, search CSP trusted sites.  Create a new trusted site named LocalHost with Trusted Site URL set to https://localhost:8082 and all other settings left to default.  Create a second CSP trusted site with the URL of your app deployed to CloudHub if you wish to demo with CloudHub (ie https://lwc-demo-app-mk.us-e2.cloudhub.io).
![](images/CloudHubCSP.png)


