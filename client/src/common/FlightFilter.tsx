import React from 'react'
import { Form, FlexboxGrid, InputPicker, DatePicker } from 'rsuite';
import { Airport } from '../types'
interface Props {
  filter: any,
  setFilter: (val: any) => void,
  airports: Airport[]
}

export default function FlightFilter(props: Props) {
  return (
    <Form
      formValue={props.filter}
      onChange={val => {
        //@ts-ignore
        props.setFilter(prev => {
          return { ...prev, ...val }
        });
      }}
    >
      <FlexboxGrid align='middle' justify='space-around'>
        <FlexboxGrid.Item colspan={3}>
          <Form.ControlLabel>From</Form.ControlLabel>
          <Form.Control name='from' accepter={DatePicker} oneTap />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={3}>
          <Form.ControlLabel>To</Form.ControlLabel>
          <Form.Control name='to' accepter={DatePicker} oneTap />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={3}>
          <Form.ControlLabel>Start</Form.ControlLabel>
          <Form.Control name='startId' accepter={InputPicker} data={props.airports.map(e => {
            return {
              label: e.name + ', ' + e.location,
              value: e.id
            }
          })} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={3}>
          <Form.ControlLabel>Destination</Form.ControlLabel>
          <Form.Control name='destinationId' accepter={InputPicker} data={props.airports.map(e => {
            return {
              label: e.name + ', ' + e.location,
              value: e.id
            }
          })} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Form>
  )
}
