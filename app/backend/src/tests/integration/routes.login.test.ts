import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../app';
import UserModel from '../../database/models/UserModel';
import { user,
  passwordInvalid,
  emailInvalid } from '../mocks/login.mock.test';

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

  it('Teste Login', async () => {
  
    const response = await chai.request(app).post('/login').send(user);
  
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
  })

  it('Teste Login sem campo de email', async () => {
    const response = await chai.request(app).post('/login').send(user.password);

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  })

  it('Teste Login sem campo de senha', async () => {
    const response = await chai.request(app).post('/login').send(user.email);

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  })

  it('Teste Login com email invalido', async () => {
    const response = await chai.request(app).post('/login').send(emailInvalid);
    
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.equal('Incorrect email or password');
  })

  it('Testa Login com senha invalida', async () => {
    const response = await chai.request(app).post('/login').send(passwordInvalid);

    expect(response).to.have.status(401);
    expect(response.body.message).to.be.equal('Incorrect email or password');
  })

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })
});


