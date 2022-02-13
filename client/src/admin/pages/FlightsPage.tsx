import PlusIcon from '@rsuite/icons/Plus';
import TrashIcon from '@rsuite/icons/Trash';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Container, DatePicker, FlexboxGrid, Form, IconButton, InputPicker, Pagination, Table } from 'rsuite';
import { Airplane, Airport, Flight, Page, SERVER } from '../../types';
import EditIcon from '@rsuite/icons/Edit';
import FlightForm from '../components/FlightForm';
import FlightFilter from '../../common/FlightFilter';
export default function FlightsPage() {
  const [airplanes, setAirplanes] = useState<Airplane[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const [filter, setFilter] = useState({
    size: 20,
    page: 0,
    destinationId: null as number | null,
    startId: null as number | null,
    from: null as Date | null,
    to: null as Date | null
  })
  const [flightsRes, setFlightsRes] = useState<Page<Flight> | undefined>(undefined);
  const [activeFlight, setActiveFlight] = useState<Flight | undefined>(undefined)
  useEffect(() => {
    axios.get(SERVER + '/user/airports').then((res) => {
      setAirports(res.data);
    })
    axios.get(SERVER + '/admin/airplanes').then((res) => {
      setAirplanes(res.data);
    })
  }, [])
  const load = () => {
    axios.get(SERVER + '/user/flights', {
      params: filter
    }).then(res => {
      setFlightsRes(res.data);
    })
  }
  useEffect(() => {
    axios.get(SERVER + '/user/flights', {
      params: filter
    }).then(res => {
      setFlightsRes(res.data);
    })
  }, [filter])

  return (
    <div className='padded'>
      <Container>
        <FlightForm
          airplanes={airplanes}
          airports={airports}
          onClose={() => {
            setOpenModal(false);
            setActiveFlight(undefined);
          }}
          open={openModal}
          flight={activeFlight}
          onSubmit={async data => {
            if (!activeFlight) {
              await axios.post(SERVER + '/admin/flights', data);

            } else {
              await axios.patch(SERVER + '/admin/flights/' + activeFlight.id, data);
            }
            load();
          }}
        />
        <FlightFilter airports={airports} filter={filter} setFilter={setFilter} />
        <FlexboxGrid.Item colspan={5} >
          <IconButton
            onClick={() => setOpenModal(true)}
            icon={<PlusIcon />}
          />
        </FlexboxGrid.Item>
        <Table
          autoHeight
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
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.Cell>
              {(flight: Flight) => {
                return (
                  <ButtonGroup>
                    <IconButton onClick={() => {
                      setActiveFlight(flight);
                      setOpenModal(true);
                    }} icon={<EditIcon />} />
                    <IconButton
                      className='danger'
                      icon={<TrashIcon />}
                      onClick={async () => {
                        await axios.delete(SERVER + '/flights/' + flight.id);
                        load();
                      }}
                    />
                  </ButtonGroup>
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
                size: val
              }
            })
          }}
        />
      </Container >
    </div>
  )
}
