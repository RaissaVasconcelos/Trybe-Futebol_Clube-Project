import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamsModel from '../database/models/TeamsModel';

// import { Response } from 'superagent';
import teams from './mocks/teams.mock.test';
// import { array } from 'joi';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test in Teams', () => {
  beforeEach(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(teams as TeamsModel[]);
  });

  it('Get all teams', async () => {
    const result = await chai.request(app).get('/teams');
    console.log('result', result);
    
    // expect(result).to.be.an('array');
    expect(result).to.have.status(200);
    expect(result.body).to.be.an('array');
    expect(result.text).to.equal(teams);
  })

  afterEach(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })
})