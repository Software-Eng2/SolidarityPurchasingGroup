import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../Login';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import API from '../API';
import LoginForm from '../Login';
const handlers = [
    rest.post('/api/sessions', (req, res, ctx) => {
      const { email, password } = req.body
  
      return res(
        ctx.json({
          email: "mariorossi@gmail.com",
          password: "mariorossi"
        })
      )
    }),
  ]

  const server = setupServer(...handlers);


beforeAll(() => {
    // Enable the mocking in tests.
    server.listen()
  })
  
  afterEach(() => {
    // Reset any runtime handlers tests may use.
    server.resetHandlers()
  })
  
  afterAll(() => {
    // Clean up once the tests are done.
    server.close()
  })

describe('LoginForm', () => {
    
  it('should allow a user to log in', async () => {
    render(<LoginForm />)



    await userEvent.type(screen.getByTestId('testemail'), 'mariorossi@gmail.com');
    await userEvent.type(screen.getByTestId('testpassword'), 'mariorossi');

    expect(await API.logIn(["",""])).toStrictEqual([undefined,undefined]);
    expect(await API.logIn("mariorossi@gmail.com","mariorossi")).toBeTruthy();
  })
})
 