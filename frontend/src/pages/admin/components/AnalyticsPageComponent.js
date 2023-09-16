import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import AdminLinksComponent from "../../../components/AdminLinksComponent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPageComponent = ({
  fetchOrdersForFirstDate,
  fetchOrdersForSecondDate,
  socketIOClient,
}) => {
  const [firstDateToCompare, setFirstDateToCompare] = useState(
    new Date().toISOString().substring(0, 10)
  );
  let previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);
  const [secondDateToCompare, setSecondDateToCompare] = useState(
    new Date(previousDay).toISOString().substring(0, 10)
  );

  const [dataForFirstSet, setDataForFirstSet] = useState([]);
  const [dataForSecondSet, setDataForSecondSet] = useState([]);

  useEffect(() => {
    const socket = socketIOClient();
    let today = new Date().toDateString();
    const handler = (newOrder) => {
      // newOrder === data.fullDocument and came from backend/models/OrderModel.js where we emitted the event
      let orderDate = new Date(newOrder.createdAt).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
        timeZone: "UTC",
      });

      if (new Date(newOrder.createdAt).toDateString() === today) {
        if (today === new Date(firstDateToCompare).toDateString()) {
          setDataForFirstSet((prev) => {
            if (prev.length === 0) {
              return [
                {
                  name: orderDate,
                  [firstDateToCompare]: newOrder.orderTotal.cartSubtotal,
                },
              ];
            }
            const length = prev.length;

            if (prev[length - 1].name === orderDate) {
              prev[length - 1][firstDateToCompare] +=
                newOrder.orderTotal.cartSubtotal;
              return [...prev];
            } else {
              let lastElem = {
                name: orderDate,
                [firstDateToCompare]:
                  prev[length - 1][firstDateToCompare] +
                  newOrder.orderTotal.cartSubtotal,
              };
              return [...prev, lastElem];
            }
          });
        } 
        
        else if (today === new Date(secondDateToCompare).toDateString()) {
          setDataForSecondSet((prev) => {
            if (prev.length === 0) {
              return [
                {
                  name: orderDate,
                  [secondDateToCompare]: newOrder.orderTotal.cartSubtotal,
                },
              ];
            }
            const length = prev.length;
            if (prev[length - 1].name === orderDate) {
              prev[length - 1][secondDateToCompare] +=
                newOrder.orderTotal.cartSubtotal;
              return [...prev];
            } else {
              var lastElem = {
                name: orderDate,
                [secondDateToCompare]:
                  prev[length - 1][secondDateToCompare] +
                  newOrder.orderTotal.cartSubtotal,
              };
              return [...prev, lastElem];
            }
          });
        }
      }
    };
    // "newOrder" came from backend/models/OrderModel.js where we emitted the event with this name
    socket.on("newOrder", (data) => console.log(data));
    return () => socket.off("newOrder", handler); // turning off the socket connection if we go to another page
  }, [
    setDataForFirstSet,
    setDataForSecondSet,
    firstDateToCompare,
    secondDateToCompare,
  ]);

  useEffect(() => {
    fetchOrdersForFirstDate(firstDateToCompare)
      .then((data) => {
        let orderSum = 0;
        const orders = data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          let date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          });
          return { name: date, [firstDateToCompare]: orderSum };
        });
        setDataForFirstSet(orders);
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );

    fetchOrdersForSecondDate(secondDateToCompare)
      .then((data) => {
        let orderSum = 0;
        const orders = data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          let date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          });
          return { name: date, [secondDateToCompare]: orderSum };
        });
        setDataForSecondSet(orders);
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
  }, [firstDateToCompare, secondDateToCompare]);

  const firstDateHandler = (e) => {
    setFirstDateToCompare(e.target.value);
  };

  const secondDateHandler = (e) => {
    setSecondDateToCompare(e.target.value);
  };

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>

      <Col md={10} width="100%" height="100%">
        <h1>
          Black Friday Cumulative Revenue {firstDateToCompare} VS{" "}
          {secondDateToCompare}
        </h1>

        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date To Compare</Form.Label>
          <Form.Control
            onChange={firstDateHandler}
            defaultValue={firstDateToCompare}
            type="date"
            name="firstDateToCompare"
            placeholder="First Date To Compare"
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date To Compare</Form.Label>
          <Form.Control
            onChange={secondDateHandler}
            defaultValue={secondDateToCompare}
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date To Compare"
          />
        </Form.Group>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "TIME",
                offset: 50,
                position: "insideBottomRight",
              }}
              allowDuplicatedCategory={false}
            />
            <YAxis
              label={{ value: "REVENUE $", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />

            {dataForFirstSet.length > dataForSecondSet.length ? (
              <>
                <Line
                  data={dataForFirstSet}
                  type="monotone"
                  dataKey={firstDateToCompare}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                />
                <Line
                  data={dataForSecondSet}
                  type="monotone"
                  dataKey={secondDateToCompare}
                  stroke="#82ca9d"
                  strokeWidth={4}
                />
              </>
            ) : (
              <>
                <Line
                  data={dataForSecondSet}
                  type="monotone"
                  dataKey={secondDateToCompare}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                />
                <Line
                  data={dataForFirstSet}
                  type="monotone"
                  dataKey={firstDateToCompare}
                  stroke="#82ca9d"
                  strokeWidth={4}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default AnalyticsPageComponent;
