import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

import { calculateFinalAmountDue, getOptimalCashback } from '../logic/Rules';

const DATE_FORMAT = 'DD-MM-YYYY hh:mm:ss';

const calculateMinutesDelay = (startTime, endTime, rentedDuration) => {
  const difference = moment(endTime).diff(moment(startTime), 'minutes');
  rentedDuration *= 60;

  return Math.max(0, difference - rentedDuration);
};

const Return = ({
  title,
  car,
  customer,
  modalShow,
  handleClose,
  handleReturn,
  currentTime,
}) => {
  const [customerPays, setCustomerPays] = useState(0);
  const delayMinutes = calculateMinutesDelay(
    car?.assignedAt,
    currentTime,
    car?.rentDuration,
  );
  const finalAmountDue = (
    calculateFinalAmountDue(
      customer?.type,
      car?.rentDuration,
      delayMinutes,
      customer?.delays,
      car?.type,
      car?.subType,
    ) -
    customer?.balance -
    customerPays
  ).toFixed(1);
  const cashBack = getOptimalCashback(Math.abs(finalAmountDue));

  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter-return"
      centered
      onExit={() => {
        setCustomerPays(0);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter-return">
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Customer</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={`${customer?.name} (${customer?.idCard})`}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rent Started At</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={moment(car?.assignedAt).format(DATE_FORMAT)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rent Stop At</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={moment(currentTime).format(DATE_FORMAT)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rented Duration</Form.Label>
            <Form.Control type="text" disabled value={car?.rentDuration} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Minutes Delayed</Form.Label>
            <Form.Control type="text" disabled value={delayMinutes} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount To Pay</Form.Label>
            <Form.Control type="text" disabled value={finalAmountDue} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Customer Pays (euro)</Form.Label>
            <Form.Control
              type="number"
              min={4}
              placeholder="How much did the customer pay? (euro)"
              value={customerPays}
              onChange={(event) => {
                setCustomerPays(Number(event.target.value));
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Give back to customer</Form.Label>
            {finalAmountDue < 0 ? (
              Object.entries(cashBack).map(([label, qty]) => (
                <React.Fragment key={label}>
                  <br />
                  <span>{`${qty} x ${label}`}</span>
                </React.Fragment>
              ))
            ) : (
              <p>0</p>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          onClick={() => handleReturn(customer?.idCard, delayMinutes > 0)}
          disabled={finalAmountDue > 0}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Return;
