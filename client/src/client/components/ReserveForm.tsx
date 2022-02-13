import React from 'react'
import { Button, Modal } from 'rsuite'
import { SeatCategories } from '../../types'
interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (category: string) => Promise<void>,
  categories: SeatCategories
}
export default function ReserveForm(props: Props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title>
          Reserve
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='space-between'>
          <div>
            Category
          </div>
          <div>
            Price
          </div>
          <div>
            Reserve
          </div>
        </div>
        {
          Object.keys(props.categories).map(key => {
            return (
              <div className='space-between'>
                <div>
                  {key}
                </div>
                <div>
                  {props.categories[key]}
                </div>
                <div>
                  <Button onClick={() => {
                    props.onSubmit(key);
                    props.onClose();
                  }}>
                    Reserve
                  </Button>
                </div>
              </div>
            )
          })
        }
      </Modal.Body>
    </Modal>
  )
}
