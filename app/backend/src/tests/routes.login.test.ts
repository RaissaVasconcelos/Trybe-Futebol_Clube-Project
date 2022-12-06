import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';

import { user,
  token,
  passwordInvalid,
  emailInvalid } from './mocks/login.mock.test';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test in Login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        "email": "admin@admin.com",
        "password": "secret_admin"
      } as UserModel);
    });
    
  it('Test in Login without token', async () => {
    sinon.stub(jwt, 'sign').resolves('admin@admin.com');
  
    const response = await chai.request(app).post('/login').send(user);
  
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');

    (jwt.sign as sinon.SinonStub).restore();
  })

  it('Test Login without email field', async () => {
    const response = await chai.request(app).post('/login').send(user.password);

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  })

  it('Test Login without password field', async () => {
    const response = await chai.request(app).post('/login').send(user.email);

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  })

  it('Test in Login with invalid email', async () => {
    const response = await chai.request(app).post('/login').send(emailInvalid);
    
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.equal('Incorrect email or password');
  })

  it('Test in Login with invalid password', async () => {
    const response = await chai.request(app).post('/login').send(passwordInvalid);

    expect(response).to.have.status(401);
    expect(response.body.message).to.be.equal('Incorrect email or password');
  })

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })
});

describe('Test in Login Validate', () => {
  // voltar nestes testes
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(jwt, 'verify').resolves({ id: 1 });
  });

  it('Test in validate Login', async () => {
    sinon.stub(UserModel, "findOne")
      .resolves({
        "email": "admin@admin.com",
        "password": "secret_admin"
      } as UserModel);
    
    const response = await chai.request(app).get('/login/validate')
      .set('Authorization', 'token');

    console.log('response', response);
    

    expect(response).to.have.status(200);
    // expect(response.body).to.have.property('role');
  })

  // it('Test invalid Login', async () => {
  //   sinon.stub(UserModel, 'findOne').resolves(undefined);

  //   const response = await chai.request(app).get('/login/validate')
  //     .set('Authorization', 'token');

  //   expect(response).to.have.status(401);

  // });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  })
})


