import React, { useEffect, useState } from 'react'
import { Button, Form, Schema } from 'rsuite';
import { Airplane } from '../../types'

interface Props {
  onSumbit: (val: Partial<Airplane>) => any,
  onDelete: () => any,
  airplane?: Airplane
}

const model = Schema.Model({
  model: Schema.Types.StringType().isRequired(),
  capacity: Schema.Types.NumberType().isRequired().min(20)
})
export default function AirplaneForm(props: Props) {
  const [formState, setFormState] = useState({});
  useEffect(() => {
    setFormState(props.airplane || {
      model: '',
      capacity: ''
    })
  }, [props.airplane])
  return (
    <Form
      model={model}
      checkTrigger='blur'
      formValue={formState}
      onChange={setFormState}
      onSubmit={(ch) => {
        if (ch) {
          props.onSumbit(formState);
        }
      }}
    >
      <Form.Group controlId='model'>
        <Form.ControlLabel>Airplane model</Form.ControlLabel>
        <Form.Control name='model' />
      </Form.Group>
      <Form.Group controlId='capacity'>
        <Form.ControlLabel>Airplane capacity</Form.ControlLabel>
        <Form.Control type='number' name='capacity' />
      </Form.Group>
      <Button type='submit'>Save</Button>
      {
        props.airplane && (

          <Button onClick={props.onDelete} className='danger' type='button'>Delete</Button>
        )
      }
    </Form>
  )
}
