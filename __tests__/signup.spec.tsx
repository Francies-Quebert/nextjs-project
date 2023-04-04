import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import SignUp from '@/pages/signup'
import axios from 'axios'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

let requestBody : any;
let counter = 0
const server = setupServer(
  rest.post('/api/1.0/users',  async (req, res, ctx) => {
    requestBody = await req.json()
    counter += 1
    return res(ctx.status(200));
  })
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close())

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('renders a heading', () => {
      render(<SignUp />)

      const heading = screen.getByRole('heading', {
        name: /Sign Up/i,
      })

      expect(heading).toBeInTheDocument()
    })


    it("has username input ", () => {
      render(<SignUp />)
      const input = screen.getByLabelText('Username')
      expect(input).toBeInTheDocument()
    })

    it("has email input ", () => {
      render(<SignUp />)
      const input = screen.getByLabelText('Email')
      expect(input).toBeInTheDocument()
    })

    it("has pasword input ", () => {
      render(<SignUp />)
      const input = screen.getByLabelText('Password')
      expect(input).toBeInTheDocument()
    })

    it("has password type for pasword input ", () => {
      render(<SignUp />)
      const input: HTMLInputElement = screen.getByLabelText('Password')
      expect(input.type).toBe('password')
    })

    it("has pasword repeat input ", () => {
      render(<SignUp />)
      const input = screen.getByLabelText('Password Repeat')
      expect(input).toBeInTheDocument()
    })

    it("has password type for pasword repeast input ", () => {
      render(<SignUp />)
      const input: HTMLInputElement = screen.getByLabelText('Password Repeat')
      expect(input.type).toBe('password')
    })

    it("The Sign Up Button ", () => {
      render(<SignUp />)
      const button: HTMLButtonElement = screen.getByRole('button', { name: 'Sign Up' })
      expect(button).toBeInTheDocument()
    })

    it("disable the button intially ", () => {
      render(<SignUp />)
      const button: HTMLButtonElement = screen.getByRole('button', { name: 'Sign Up' })
      expect(button).toBeDisabled()
    })
  })

  describe('Interactions', () => {

    it("enable button when user enter same password and same repeat password", async () => {
      render(<SignUp />)
      const password: HTMLInputElement = screen.getByLabelText('Password')
      const passwordRepeat: HTMLInputElement = screen.getByLabelText('Password Repeat')
      await userEvent.type(password, 'P4ssword')
      await userEvent.type(passwordRepeat, 'P4ssword')
      const button = screen.queryByRole('button', { name: 'Sign Up' })
      screen.debug()
      expect(button).toBeEnabled()
    })
  })

  describe('Backend Interactions', () => {
    var button: Element | null;
    const message = 'Please check your Email to activate your account';
    const setup =async  () => {
      render(<SignUp />);
      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      await userEvent.type(usernameInput, 'abc-user');
      await userEvent.type(emailInput, 'abc@gmail.com');
      await userEvent.type(passwordInput, 'P4ssword');
      await userEvent.type(passwordRepeatInput, 'P4ssword');
    };


    it("sends username, email and password to backend after clicking the button", async () => {
      await setup()
      // const mockFn = jest.fn().mockImplementation(() => Promise.resolve());
      const mockFn = jest.fn();
      window.fetch = mockFn;
      if (button) {
        await userEvent.click(button)
        await screen.findByText(message);
        expect(requestBody).toEqual({
          username: 'abc-user',
          email: 'abc@gmail.com',
          password: 'P4ssword'
        })
      }
    })


    it("disable button when there is an ongoing api call", async () => {
      await setup()
      // const mockFn = jest.fn().mockImplementation(() => Promise.resolve());
      const mockFn = jest.fn();
      window.fetch = mockFn;
      
      if (button) {
        await userEvent.click(button)
        await userEvent.click(button)
        await screen.findByText(message)
        expect(counter).toBe(1)
      }
    })


    it('displays spinner after clicking the submit', async () => {
      setup()
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
       if(button) {
          await userEvent.click(button)
          expect(button).toBeDisabled()
          const spinner = screen.getByRole('status')
          expect(spinner).toBeInTheDocument();
          await screen.findByText(message);
      }
      
      
   
    })

    it('displays success message after sign up success full', async () => {
      setup()
      expect(screen.queryByText(message)).not.toBeInTheDocument();
      if(button) {
        await userEvent.click(button);
        const text =  await screen.findByText(message);
        expect(text).toBeInTheDocument()
      }
    })
    
  })


}) 
