import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import API from '../API';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import LoginForm from '../LoginForm';
import Adapter from 'enzyme-adapter-react-16';
/**
* @jest-environment node
*/
configure({ adapter: new Adapter() });
const handlers = [
    rest.post('/api/sessions ', (req, res, ctx) => {
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
  const doLogIn = (email,password)=>{
    API.logIn(email,password);
  }

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
 
    
  it('should allow a user to log in', async () => {
    shallow(<LoginForm doLogIn={doLogIn}/>)

    expect(await API.logIn(["",""])).toStrictEqual([undefined,undefined]);
    expect(await API.logIn("mariorossi@gmail.com","mariorossi")).toBeTruthy();
  })

 