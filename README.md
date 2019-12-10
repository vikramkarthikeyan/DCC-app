# DCC-app
Data Intensive Computing Certification Dapp project

## Steps to deploy application

### Step - 1: Deploy the truffle contract

1. Go to the contract folder `cd course-certifier-contract`
2. [Optional] Modify network address and port if deploying contract other than local machine
3. Compile the contract `truffle compile`
4. Deploy the contract `truffle migrate --reset`

### Step - 2: Configure the node server

1. Come back to home and go to the node app folder - `cd ../ && cd course-certifer-app`
2. Add the ENV variables

```
export BLOCKCHAIN_ENDPOINT=<blockchain end-point>
export CONTRACT_ADDRESS=<address of the deployed contract>
export PRIVATE_KEY=<Private key of the first account in deployed chain>
export PRIMARY_ACCOUNT=<Account number of the first account in deployed chain>
```

3. Install node modules - `npm install`
4. Start the server - `npm start`


