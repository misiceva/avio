import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Container, Content, FlexboxGrid, Form, Panel, Schema } from 'rsuite';
import { SERVER, User } from '../types';

const model = Schema.Model({
  email: Schema.Types.StringType().isRequired().isEmail(),
  password: Schema.Types.StringType().isRequired(),
  repeat: Schema.Types.StringType().isRequired().addRule((value, model) => {
    return value === model.password
  }, 'Sifre nisu iste', true),
  firstName: Schema.Types.StringType().isRequired(),
  lastName: Schema.Types.StringType().isRequired(),
  age: Schema.Types.NumberType().isRequired().min(9),
});

interface Props {
  setUser: (u: User) => void
}

export default function RegisterPage(props: Props) {
  const [forma, setForma] = useState({
    email: '',
    password: '',
    repeat: '',
    firstName: '',
    lastName: '',
    age: 13
  });
  return (
    <div className="show-fake-browser login-page">
      <Container>
        <Content className='spusteno'>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel className='gray' header={<h3>Registracija</h3>} bordered>
                <Form
                  checkTrigger='blur'
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
                    const res = await axios.post(SERVER + '/auth/register', forma);
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
                    <Form.ControlLabel>Potvrdite sifru</Form.ControlLabel>
                    <Form.Control name="repeat" type="password" autoComplete="off" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Ime</Form.ControlLabel>
                    <Form.Control name="firstName" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Prezime</Form.ControlLabel>
                    <Form.Control name="lastName" />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button type='submit' appearance="primary">Registrujte se</Button>
                      <Link to='/'>
                        <Button type='button' appearance="link">Idi na stranicu za prijavu</Button>
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
