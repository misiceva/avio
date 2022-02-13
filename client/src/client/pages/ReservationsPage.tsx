import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Header, Table, IconButton } from 'rsuite'
import { Reservation, SERVER } from '../../types'
import TrashIcon from '@rsuite/icons/Trash';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  useEffect(() => {
    axios.get(SERVER + '/user/reservations').then(res => {
      setReservations(res.data);
    })
  }, [])
  return (
    <div className='padded'>
      <Container>
        <Header>
          <h1 className='text-center'>Your reservations</h1>
        </Header>
        <Table
          autoHeight
          rowHeight={60}
          data={reservations}
        >
          <Table.Column flexGrow={1}>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell dataKey='id' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Seat category</Table.HeaderCell>
            <Table.Cell dataKey='seatCategory' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.Cell dataKey='price' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Take off</Table.HeaderCell>
            <Table.Cell>
              {(r: Reservation) => {
                return r.flight?.startTime
              }}
            </Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Flight duration</Table.HeaderCell>
            <Table.Cell>
              {(r: Reservation) => {
                return r.flight?.duration
              }}
            </Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Start</Table.HeaderCell>
            <Table.Cell>
              {(r: Reservation) => {
                return r.flight?.start.name
              }}
            </Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Destination</Table.HeaderCell>
            <Table.Cell>
              {(r: Reservation) => {
                return r.flight?.destination.name
              }}
            </Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Airplane</Table.HeaderCell>
            <Table.Cell>
              {(r: Reservation) => {
                return r.flight?.airplane.model
              }}
            </Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Cancel reservation</Table.HeaderCell>
            <Table.Cell>
              {(r: Reservation) => {
                return (
                  <IconButton
                    className='danger'
                    icon={<TrashIcon />}
                    onClick={async () => {
                      if (!r) {
                        return;
                      }
                      await axios.delete(SERVER + '/user/reservations/' + r.id);
                      setReservations(prev => {
                        return prev.filter(e => e !== r)
                      })
                    }}
                  />
                )
              }}
            </Table.Cell>
          </Table.Column>
        </Table>
      </Container>
    </div>
  )
}
