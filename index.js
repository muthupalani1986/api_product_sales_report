const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const _ = require('lodash');

// parse application/json
app.use(bodyParser.json());


//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sales_report'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//Get settlement report
app.post('/api/settlement/report', (req, res) => {
    const payload = _.get(req.body, 'payload', false);
    let sql = 'SELECT * FROM settlement';
    if (payload) {
        sql = sql + ' where `settlement-start-date` between "' + payload.start_date + '" and "' + payload.end_date + '"';
    }
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.json({ 'satus': 404, 'error': 'Mysql Error' });
        } else {
            res.json({ "status": 200, "error": null, "response": results });
        }
    });
});

//Save sales report
app.post('/api/settlement/save', (req, res) => {
    const payload = _.get(req.body, 'payload', false);
    if (!payload) {
        res.sendStatus(404);
        return;
    }
    let sqlQuery = 'INSERT INTO settlement (`settlement-id`,`settlement-start-date`,`settlement-end-date`,`deposit-date`,`total-amount` , `currency` , `transaction-type` , `order-id` , `merchant-order-id` , `adjustment-id` , `shipment-id` , `marketplace-name` , `shipment-fee-type` , `shipment-fee-amount` , `order-fee-type` , `order-fee-amount` , `fulfillment-id` , `posted-date` , `order-item-code` , `merchant-order-item-id` , `merchant-adjustment-item-id` , `sku` , `quantity-purchased` , `price-type` , `price-amount` , `item-related-fee-type` , `item-related-fee-amount` , `misc-fee-amount` , `other-fee-amount` , `other-fee-reason-description` , `promotion-id` , `promotion-type` , `promotion-amount` , `direct-payment-type` , `direct-payment-amount` , `other-amount`) VALUES ?';
    let sqlColumnValues = [];
    _.forEach(payload.settlements, (column) => {
        let columnValue = [];
        const settlement_id = column["settlement-id"].length === 0 ? null : column["settlement-id"];
        columnValue.push(settlement_id);
        const settlement_start_date = column["settlement-start-date"].length === 0 ? null : column["settlement-start-date"];
        columnValue.push(settlement_start_date);
        const settlement_end_date = column["settlement-end-date"].length === 0 ? null : column["settlement-end-date"];
        columnValue.push(settlement_end_date);
        const deposit_date = column["deposit-date"].length === 0 ? null : column["deposit-date"];
        columnValue.push(deposit_date);
        const total_amount = column["total-amount"].length === 0 ? null : column["total-amount"];
        columnValue.push(total_amount);
        const currency = column["currency"].length === 0 ? null : column["currency"];
        columnValue.push(currency);
        const transaction_type = column["transaction-type"].length === 0 ? null : column["transaction-type"];
        columnValue.push(transaction_type);
        const order_id = column["order-id"].length === 0 ? null : column["order-id"];
        columnValue.push(order_id);
        const merchant_order_id = column["merchant-order-id"].length === 0 ? null : column["merchant-order-id"];
        columnValue.push(merchant_order_id);
        const adjustment_id = column["adjustment-id"].length === 0 ? null : column["adjustment-id"];
        columnValue.push(adjustment_id);
        const shipment_id = column["shipment-id"].length === 0 ? null : column["shipment-id"];
        columnValue.push(shipment_id);
        const marketplace_name = column["marketplace-name"].length === 0 ? null : column["marketplace-name"];
        columnValue.push(marketplace_name);
        const shipment_fee_type = column["shipment-fee-type"].length === 0 ? null : column["shipment-fee-type"];
        columnValue.push(shipment_fee_type);
        const shipment_fee_amount = column["shipment-fee-amount"].length === 0 ? null : column["shipment-fee-amount"];
        columnValue.push(shipment_fee_amount);
        const order_fee_type = column["order-fee-type"].length === 0 ? null : column["order-fee-type"];
        columnValue.push(order_fee_type);
        const order_fee_amount = column["order-fee-amount"].length === 0 ? null : column["order-fee-amount"];
        columnValue.push(order_fee_amount);
        const fulfillment_id = column["fulfillment-id"].length === 0 ? null : column["fulfillment-id"];
        columnValue.push(fulfillment_id);
        const posted_date = column["posted-date"].length === 0 ? null : column["posted-date"];
        columnValue.push(posted_date);
        const order_item_code = column["order-item-code"].length === 0 ? null : column["order-item-code"];
        columnValue.push(order_item_code);
        const merchant_order_item_id = column["merchant-order-item-id"].length === 0 ? null : column["merchant-order-item-id"];
        columnValue.push(merchant_order_item_id);
        const merchant_adjustment_item_id = column["merchant-adjustment-item-id"].length === 0 ? null : column["merchant-adjustment-item-id"];
        columnValue.push(merchant_adjustment_item_id);
        const sku = column["sku"].length === 0 ? null : column["sku"];
        columnValue.push(sku);
        const quantity_purchased = column["quantity-purchased"].length === 0 ? null : column["quantity-purchased"];
        columnValue.push(quantity_purchased);
        const price_type = column["price-type"].length === 0 ? null : column["price-type"];
        columnValue.push(price_type);
        const price_amount = column["price-amount"].length === 0 ? null : column["price-amount"];
        columnValue.push(price_amount);
        const item_related_fee_type = column["item-related-fee-type"].length === 0 ? null : column["item-related-fee-type"];
        columnValue.push(item_related_fee_type);
        const item_related_fee_amount = column["item-related-fee-amount"].length === 0 ? null : column["item-related-fee-amount"];
        columnValue.push(item_related_fee_amount);
        const misc_fee_amount = column["misc-fee-amount"].length === 0 ? null : column["misc-fee-amount"];
        columnValue.push(misc_fee_amount);
        const other_fee_amount = column["other-fee-amount"].length === 0 ? null : column["other-fee-amount"];
        columnValue.push(other_fee_amount);
        const other_fee_reason_description = column["other-fee-reason-description"].length === 0 ? null : column["other-fee-reason-description"];
        columnValue.push(other_fee_reason_description);
        const promotion_id = column["promotion-id"].length === 0 ? null : column["promotion-id"]
        columnValue.push(promotion_id);
        const promotion_type = column["promotion-type"].length === 0 ? null : column["promotion-type"];
        columnValue.push(promotion_type);
        const promotion_amount = column["promotion-amount"].length === 0 ? null : column["promotion-amount"];
        columnValue.push(promotion_amount);
        const direct_payment_type = column["direct-payment-type"].length === 0 ? null : column["direct-payment-type"];
        columnValue.push(direct_payment_type);
        const direct_payment_amount = column["direct-payment-amount"].length === 0 ? null : column["direct-payment-amount"];
        columnValue.push(direct_payment_amount);
        const other_amount = column["other-amount"].length === 0 ? null : column["other-amount"];
        columnValue.push(other_amount);
        sqlColumnValues.push(columnValue);
    });
    conn.query(sqlQuery, [sqlColumnValues], function (err) {
        if (!err) {
            res.json({ 'satus': 200 });
        } else {
            res.json({ 'satus': 404, 'error': 'Mysql Error' });
        }
    });

});

//Server listening
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});