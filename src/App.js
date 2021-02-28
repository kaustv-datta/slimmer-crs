import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import createPersistedState from 'use-persisted-state';
import moment from 'moment';

import { getSystemState } from './logic/APILayer';
import RentModal from './components/Rent';
import ReturnModal from './components/Return';

import logo from './assets/images/car.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const useCRSState = createPersistedState('CRS_DB_PERSIST');

function App() {
  const [crsData, setCrsData] = useCRSState(getSystemState());
  const [selectedCar, setSelectedCar] = useState();
  const [showRentModel, setShowRentModel] = useState(false);
  const [showReturnModel, setShowReturnModel] = useState(false);
  console.log(crsData);

  const rentCar = (customerId, hours, pledge) => {
    setCrsData({
      vehicles: crsData.vehicles.map((vehicle) => {
        if (vehicle.id === selectedCar.id) {
          return {
            ...vehicle,
            assignedAt: moment(),
            assignedTo: customerId,
            rentDuration: hours,
            isAvailable: false,
          };
        }
        return vehicle;
      }),
      customers: crsData.customers.map((customer) => {
        if (customer.idCard === customerId) {
          return { ...customer, isAssigned: selectedCar.id, balance: pledge };
        }
        return customer;
      }),
    });
  };

  return (
    <div className="App">
      {/* HEADER */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {'  '}
          MyCar Rental Service
        </Navbar.Brand>
      </Navbar>

      {/* BODY */}
      <Container fluid>
        <Row className="justify-content-md-center" style={{ paddingTop: 20 }}>
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-Search">Search</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Search"
                aria-describedby="inputGroup-Search"
                placeholder="(NOT IMPLEMENTED)"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Car Type</th>
                  <th>Car SubType</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {crsData.vehicles.length > 0 ? (
                  crsData.vehicles
                    .sort((a, b) => {
                      // Keep unavailable cars at bottom
                      if (a.isAvailable && b.isAvailable) {
                        return 0;
                      }
                      if (a.isAvailable) {
                        return -1;
                      }
                      return 1;
                    })
                    .map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td>{vehicle.type}</td>
                        <td>{vehicle.subType}</td>
                        <td>{vehicle.assignedTo || 'Unassigned'}</td>
                        <td>
                          <Button
                            variant={
                              vehicle.isAvailable
                                ? 'success'
                                : 'outline-success'
                            }
                            disabled={!vehicle.isAvailable}
                            onClick={() => {
                              setSelectedCar(vehicle);
                              setShowRentModel(true);
                            }}
                          >
                            Rent
                          </Button>{' '}
                          <Button
                            disabled={vehicle.isAvailable}
                            variant={
                              vehicle.isAvailable
                                ? 'outline-warning'
                                : 'warning'
                            }
                            onClick={() => {
                              setSelectedCar(vehicle);
                              setShowReturnModel(true);
                            }}
                          >
                            Return
                          </Button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4">No Data Available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* MISC */}
      <RentModal
        title={`Rent Car - ${selectedCar?.type} (${selectedCar?.subType})`}
        car={selectedCar}
        modalShow={showRentModel}
        customers={crsData.customers}
        handleClose={() => {
          setShowRentModel(false);
        }}
        handleRent={(customer, hours, pledge) => {
          rentCar(customer?.idCard, hours, pledge);
          setShowRentModel(false);
        }}
      />
      <ReturnModal
        title={`Return Car - ${selectedCar?.type} (${selectedCar?.subType})`}
        car={selectedCar}
        customer={crsData.customers.find(
          (cust) => cust.idCard === selectedCar?.assignedTo,
        )}
        currentTime={moment().format()}
        modalShow={showReturnModel}
        handleClose={() => {
          setShowReturnModel(false);
        }}
        handleReturn={(customerId, wasDelayed, balance) => {}}
      />
    </div>
  );
}

export default App;
