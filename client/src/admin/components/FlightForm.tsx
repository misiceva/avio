import React, { useEffect, useState } from 'react'
import { DatePicker, Form, InputPicker, Modal, Button, IconButton, Input, Schema } from 'rsuite'
import { Airplane, Airport, Flight, SeatCategories, WriteFlightDto } from '../../types'
import TrashIcon from '@rsuite/icons/Trash';
import PlusIcon from '@rsuite/icons/Plus';
interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (data: WriteFlightDto) => Promise<void>,
  flight?: Flight,
  airplanes: Airplane[],
  airports: Airport[]
}
interface WriteSeatCategory {
  name: string,
  price: number
}

const model = Schema.Model({
  startTime: Schema.Types.DateType().isRequired(),
  duration: Schema.Types.NumberType().isRequired().min(1),
  startId: Schema.Types.NumberType().isRequired(),
  destinationId: Schema.Types.NumberType().isRequired().addRule((val: any, data: any) => {
    return val != data.destinationId
  }, 'Start and destination cannot be same', true),
  airplaneId: Schema.Types.NumberType().isRequired(),
})

const initialState = {
  startTime: null as Date | null,
  duration: 0,
  startId: 0,
  destinationId: 0,
  seatCategories: [] as WriteSeatCategory[],
  airplaneId: 0
}
export default function FlightForm(props: Props) {
  const [formValue, setFormValue] = useState(initialState);
  useEffect(() => {
    if (props.flight) {
      setFormValue({
        startTime: new Date(props.flight.startTime),
        airplaneId: props.flight.airplane.id,
        destinationId: props.flight.destination.id,
        startId: props.flight.start.id,
        duration: props.flight.duration,
        seatCategories: Object.keys(props.flight.seatCategories).map(e => {
          return {
            name: e,
            price: props.flight!.seatCategories[e]
          }
        })
      })
    } else {
      setFormValue({ ...initialState });
    }
  }, [props.flight])
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title>
          {props.flight ? 'Update flight' : 'Create flight'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className='fluid'
          formValue={formValue}
          onChange={val => {
            //@ts-ignore
            setFormValue(prev => {
              return {
                ...prev,
                ...val
              }
            })
          }}
          onSubmit={async () => {
            await props.onSubmit({
              startTime: formValue.startTime?.getTime() || 0,
              duration: formValue.duration || 0,
              startId: formValue.startId || 0,
              destinationId: formValue.destinationId || 0,
              airplaneId: formValue.airplaneId || 0,
              seatCategories: formValue.seatCategories.reduce((acc, element) => {
                acc[element.name] = element.price
                return acc;
              }, {} as SeatCategories)
            });
            props.onClose();
          }}
          checkTrigger='blur'
        >
          <Form.Group>
            <Form.ControlLabel>Take off</Form.ControlLabel>
            <Form.Control className='fluid' name="startTime" accepter={DatePicker} format='dd MMM yyyy HH:mm' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Duration</Form.ControlLabel>
            <Form.Control className='fluid' name="duration" type='number' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Airplane</Form.ControlLabel>
            <Form.Control className='fluid' name="airplaneId" accepter={InputPicker} data={props.airplanes.map(element => {
              return {
                value: element.id,
                label: element.model
              }
            })} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Start</Form.ControlLabel>
            <Form.Control className='fluid' name="startId" accepter={InputPicker} data={props.airports.map(element => {
              return {
                value: element.id,
                label: element.name
              }
            })} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Destination</Form.ControlLabel>
            <Form.Control className='fluid' name="destinationId" accepter={InputPicker} data={props.airports.map(element => {
              return {
                value: element.id,
                label: element.name
              }
            })} />
          </Form.Group>
          <div className='space-between paddedBottom'>
            <h4>Seat categories</h4>
            <IconButton
              onClick={() => {
                setFormValue(prev => {
                  return {
                    ...prev,
                    seatCategories: [
                      ...prev.seatCategories, {
                        name: '',
                        price: 0
                      }
                    ]
                  }
                })
              }}
              icon={<PlusIcon />}
            />
          </div>
          {
            formValue.seatCategories.map((element) => {
              return (
                <div className='space-between paddedBottom'>
                  <Input placeholder='Category name' value={element.name} onChange={(val) => {
                    setFormValue(prev => {
                      return {
                        ...prev,
                        seatCategories: prev.seatCategories.map(category => {
                          if (category === element) {
                            return {
                              name: val,
                              price: category.price
                            }
                          }
                          return category
                        })
                      }
                    })
                  }} />
                  <Input value={element.price} type='number' onChange={(val) => {
                    setFormValue(prev => {
                      return {
                        ...prev,
                        seatCategories: prev.seatCategories.map(category => {
                          if (category === element) {
                            return {
                              name: category.name,
                              price: Number(val)
                            }
                          }
                          return category
                        })
                      }
                    })
                  }} />
                  <IconButton
                    className='danger'
                    icon={<TrashIcon />}
                    onClick={() => {
                      setFormValue(prev => {
                        return {
                          ...prev,
                          seatCategories: prev.seatCategories.filter(e => e !== element)
                        }
                      })
                    }}
                  />
                </div>
              )
            })
          }
          <Button className='fluid' type='submit' appearance='primary'>Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
