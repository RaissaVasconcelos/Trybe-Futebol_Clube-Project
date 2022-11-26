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
      
      expect(result).to.have.status(200);
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(teams);
  })

    it('GetById team', async () => {
      const result = await chai.request(app).get('/teams:1');

      expect(result).to.have.status(200);
      expect(result).to.deep.equal(teams[0]);
    });

    it('GetById team with id is not number', async () => {
      const result = await chai.request(app).get('/teams:a');

      expect(result).to.have.status(400);
      expect(result).to.deep.equal('Id is number');
    })

    it('GetById team id not found', async () => {
      const result = await chai.request(app).get('/teams:32');

      expect(result).to.have.status(404);
      expect(result).to.deep.equal('Team is not found');
    })

  afterEach(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })
})