const express = require('express')
const cookieParser = require('cookie-parser')
const carDB = require('./containers/car.js');
const clientDB = require('./containers/client.js');
const agencyDB = require('./containers/agency.js');
const authDB = require('./auth/login.js');
const categoryDB = require('./containers/category.js');
const dealDB = require('./containers/deal.js');
const mailboxDB = require('./containers/mailbox.js');
const maintenancemanagerDB = require('./containers/maintenancemanager.js');
const rentalDB = require('./containers/rental.js');
const rental_clientDB = require('./containers/rental_client.js');
const repairingDB = require('./containers/repairing.js');
const request_repair_serviceDB = require('./containers/request_repair_service.js');
const invoiceDB = require('./containers/invoice.js');
const historyDB = require('./containers/history.js');
app = express();
cors = require('cors');
bodyParser = require('body-parser');
const port = 9000;
// use the modules
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // parsing incoming requests with urlencoded based body-parser
app.use(cookieParser())
app.use('/car', carDB);
app.use('/client', clientDB);
app.use('/invoice', invoiceDB);
app.use('/agency', agencyDB);
app.use('/auth', authDB);
app.use('/category', categoryDB);
app.use('/deal', dealDB);
app.use('/mailbox', mailboxDB);
app.use('/maintmanag', maintenancemanagerDB);
app.use('/rental', rentalDB);
app.use('/rental_client', rental_clientDB);
app.use('/repairing', repairingDB);
app.use('/repairservice', request_repair_serviceDB);
app.use('/history', historyDB);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.listen(port, () => console.log(`App listening on port ${port}!`))