import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

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
  handleRent,
  currentTime,
}) => {
  const delayMinutes = calculateMinutesDelay(
    car?.assignedAt,
    currentTime,
    car?.rentDuration,
  );

  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter-return"
      centered
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
            <Form.Label>Minutes Delayed</Form.Label>
            <Form.Control type="text" disabled value={delayMinutes} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount To Pay</Form.Label>
            <Form.Control type="text" disabled value={-1} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          onClick={() => handleRent(customer, hours, pledge)}
          disabled={customer == null}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Return;
