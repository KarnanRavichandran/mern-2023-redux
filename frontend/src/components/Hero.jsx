import React from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN auth</h1>
          <p className='text-center mb-4'>
            SON Web Tokens are most commonly used to identify an authenticated user. They are issued by an authentication server and are consumed by the client-server (to secure its APIs
          </p>
          <div className='d-flex'>
            <LinkContainer to={'/login'}>
              <Button variant="primary" className='me-3'>Sign in</Button>
            </LinkContainer>

            <LinkContainer to={'/register'}>
              <Button variant="secondary" href='/register'>SignUp</Button>
            </LinkContainer>

          </div>
        </Card>
      </Container>

    </div>
  )
}

export default Hero