import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SelectSearch from 'react-select-search';

import fuzzySearch from '../utils/fuzzySearch';
import { pledgeValue, calculatePaymentRequired } from '../logic/Rules';

const Rent = ({
  customers,
  handleRent,
  modalShow,
  handleClose,
  title,
  car,
}) => {
  const [customer, setCustomer] = useState(null);
  const [hours, setHours] = useState(4);
  const [pledge, setPledge] = useState(0);
  const [customerPay, setCustomerPay] = useState(0);
  const customerOptions = customers.map((cust) => ({
    name: `${cust.name} (${cust.idCard})`,
    value: cust.idCard,
    disabled: cust.isAssigned != null,
  }));
  const paymentNeeded =
    calculatePaymentRequired(customer?.type, hours, car?.type, car?.subType) -
    customer?.balance;

  useEffect(() => {
    setPledge(pledgeValue(customer?.type, car?.type));
  }, [customer]);

  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={() => {
        setCustomer(null);
        setHours(4);
        setPledge(0);
        setCustomerPay(0);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Customer</Form.Label>
            <SelectSearch
              options={customerOptions}
              search
              value={customer?.idCard}
              onChange={(customerId) => {
                setCustomer(
                  customers.find((cust) => cust.idCard === customerId),
                );
              }}
              filterOptions={fuzzySearch}
              placeholder="Type to search..."
            />
          </Form.Group>
          <Form.Group controlId="formGroup-hours">
            <Form.Label>Hours</Form.Label>
            <Form.Control
              type="number"
              placeholder="Select hours"
              min={4}
              max={1000}
              value={hours}
              onChange={(event) => {
                setHours(
                  Math.max(4, Math.min(1000, Number(event.target.value))),
                );
              }}
            />
          </Form.Group>
          <Form.Group controlId="formGroup-pledge">
            <Form.Label>Pledge</Form.Label>
            <Form.Control type="text" disabled value={pledge} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Previous balance (if any)</Form.Label>
            <Form.Control type="text" disabled value={customer?.balance} />
          </Form.Group>
          <Form.Group controlId="formGroup-payment-needed">
            <Form.Label>Payment Required</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={
                Number.isNaN(paymentNeeded) || paymentNeeded === 'NaN'
                  ? '-'
                  : paymentNeeded
              }
            />
          </Form.Group>
          <Form.Group controlId="formGroup-payment-customer">
            <Form.Label>Customer paid (euro)?</Form.Label>
            <Form.Control
              type="number"
              placeholder="How much did the customer pay? (euro)"
              min={0}
              value={customerPay}
              onChange={(event) => {
                setCustomerPay(Number(event.target.value));
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          onClick={() => handleRent(customer, hours, pledge)}
          disabled={customer == null || customerPay < paymentNeeded}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Rent;
