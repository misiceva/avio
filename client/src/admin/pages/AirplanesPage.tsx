import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, FlexboxGrid, Header, Table } from 'rsuite'
import { Airplane, SERVER } from '../../types'
import AirplaneForm from '../components/AirplaneForm'

export default function AirplanesPage() {
  const [airplanes, setAirplanes] = useState<Airplane[]>([])
  const [selectedId, setSelectedId] = useState(0)
  const selectedAirplane = airplanes.find(e => e.id === selectedId);
  useEffect(() => {
    axios.get(SERVER + '/admin/airplanes').then(res => {
      setAirplanes(res.data);
    })
  }, [])
  const onCreate = async (data: Partial<Airplane>) => {
    const res = await axios.post(SERVER + '/admin/airplanes', data);
    setAirplanes(prev => {
      return [...prev, res.data];
    })
  }
  const onUpdate = async (data: Partial<Airplane>) => {
    const res = await axios.patch(SERVER + '/admin/airplanes/' + selectedId, data);
    setAirplanes(prev => {
      return prev.map(element => {
        if (element.id === selectedId) {
          return res.data;
        }
        return element;
      })
    })
  }
  const onDelete = async () => {
    if (!selectedId) {
      return;
    }
    await axios.delete(SERVER + '/admin/airplanes/' + selectedId);
    setAirplanes(prev => {
      return prev.filter(e => e.id !== selectedId)
    })
  }
  return (
    <Container>
      <Header>
        <h1 className='text-center'>Airplanes</h1>
      </Header>
      <FlexboxGrid justify='space-around'>
        <FlexboxGrid.Item colspan={8}>
          <Table
            autoHeight
            data={airplanes}
            rowClassName={row => {
              if (selectedId === row?.id) {
                return 'active-row';
              }
              return ''
            }}
            onRowClick={(rowData) => {
              setSelectedId(prev => {
                return prev === rowData?.id ? 0 : rowData?.id
              })
            }}
          >
            <Table.Column>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell dataKey='id' />
            </Table.Column>
            <Table.Column>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.Cell dataKey='model' />
            </Table.Column>
            <Table.Column>
              <Table.HeaderCell>Capacity</Table.HeaderCell>
              <Table.Cell dataKey='capacity' />
            </Table.Column>
          </Table>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <h2 className='text-center'>
            {
              selectedAirplane ? 'Update airplane' : 'Create airplane'
            }
          </h2>
          <AirplaneForm
            airplane={selectedAirplane}
            onDelete={onDelete}
            onSumbit={async (data) => {
              if (selectedId > 0) {
                onUpdate(data);
              } else {
                onCreate(data)
              }
            }}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  )
}
