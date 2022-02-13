import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Container, Content, FlexboxGrid, Form, Panel, Schema } from 'rsuite';
import { SERVER, User } from '../types'

const model = Schema.Model({
  email: Schema.Types.StringType().isRequired().isEmail(),
  password: Schema.Types.StringType().isRequired()
})

interface Props {
  setUser: (u: any) => void
}

export default function LoginPage(props: Props) {
  const [imageUrl, setImageUrl] = useState('')
  const [forma, setForma] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
    axios.get(SERVER + '/image', { withCredentials: false }).then(res => {
      setImageUrl(res.data.url);
    })
  }, [])
  return (
    <div className="show-fake-browser login-page padded">
      <Container>
        <Content className='spusteno'>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={13}>
              <img src={imageUrl || undefined} alt="" width='100%' height={600} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={9}>
              <Panel className='gray' header={<h3>Login</h3>} bordered>
                <Form
                  formValue={forma}
                  model={model}
                  onChange={value => {
                    //@ts-ignore
                    setForma(value);
                  }}
                  onSubmit={async (check) => {
                    if (!check) {
                      return;
                    }
                    const res = await axios.post(SERVER + '/auth/login', forma);
                    props.setUser(res.data);
                  }}
                  fluid>
                  <Form.Group>
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Sifra</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button type='submit' appearance="primary">Prijavite se</Button>
                      <Link to='/register'>
                        <Button type='button' appearance="link">Nemate nalog?</Button>
                      </Link>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
}
