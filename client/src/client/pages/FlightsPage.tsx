import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ButtonGroup, Container, IconButton, Pagination, Table } from 'rsuite';
import FlightFilter from '../../common/FlightFilter';
import { Page, SERVER, Flight, Airport } from '../../types'
import CheckIcon from '@rsuite/icons/Check';
import ReserveForm from '../components/ReserveForm';
export default function FlightsPage() {
  const [filter, setFilter] = useState({
    size: 20,
    page: 0,
    destinationId: null as number | null,
    startId: null as number | null,
    from: null as Date | null,
    to: null as Date | null
  })
  const [flightsRes, setFlightsRes] = useState<Page<Flight> | undefined>(undefined);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const [activeFlight, setActiveFlight] = useState<Flight | undefined>(undefined)
  useEffect(() => {
    axios.get(SERVER + '/user/flights', {
      params: filter
    }).then(res => {
      setFlightsRes(res.data);
    })
  }, [filter])
  useEffect(() => {
    axios.get(SERVER + '/user/airports').then((res) => {
      setAirports(res.data);
    })
  }, [])
  return (
    <div className='padded'>
      <Container>
        <ReserveForm
          categories={activeFlight?.seatCategories || {}}
          onClose={() => { setOpenModal(false) }}
          open={openModal}
          onSubmit={async (val) => {
            if (!activeFlight) {
              return;
            }
            await axios.post(SERVER + '/user/flights/' + activeFlight.id, {
              seatCategory: val
            })
            setActiveFlight(undefined);
          }}
        />
        <FlightFilter airports={airports} filter={filter} setFilter={setFilter} />
        <Table
          autoHeight
          rowHeight={60}
          data={flightsRes?.data || []}
        >
          <Table.Column flexGrow={1}>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell dataKey='id' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell >Take off</Table.HeaderCell>
            <Table.Cell dataKey='startTime' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Flight duration</Table.HeaderCell>
            <Table.Cell dataKey='duration' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Start</Table.HeaderCell>
            <Table.Cell dataKey='start.name' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Destination</Table.HeaderCell>
            <Table.Cell dataKey='destination.name' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Plane</Table.HeaderCell>
            <Table.Cell dataKey='airplane.model' />
          </Table.Column>
          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Reserve</Table.HeaderCell>
            <Table.Cell>
              {(flight: Flight) => {
                return (

                  <IconButton appearance='primary' onClick={() => {
                    setActiveFlight(flight);
                    setOpenModal(true);
                  }} icon={<CheckIcon />} />
                )
              }}
            </Table.Cell>
          </Table.Column>
        </Table>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={flightsRes?.total || 0}
          limitOptions={[10, 20]}
          limit={filter.size}
          activePage={filter.page + 1}
          onChangePage={(val: any) => {
            setFilter(prev => {
              return {
                ...prev,
                page: val - 1
              }
            })
          }}
          onChangeLimit={(val: any) => {
            setFilter(prev => {
              return {
                ...prev,
                page: val
              }
            })
          }}
        />
      </Container>
    </div>
  )
}
