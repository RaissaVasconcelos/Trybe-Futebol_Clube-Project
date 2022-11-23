import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test in Login', () => {
  let chaiHttpResponse: Response;
  it('Teste create User', async () => {
    before(async () => {
      sinon
        .stub(UserModel, "create")
        .resolves({
          username: "Admin",
          email: "admin@admin.com",
          password: "D0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
        } as UserModel);
    });

  
    const response = await chai.request(app).post('/login').send({
            username: "Admin",
            email: "admin@admin.com",
            password: "D0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
          })
  
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ
    .XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc`);
  

    after(()=>{
      (UserModel.create as sinon.SinonStub).restore();
    })
    
  })
});


