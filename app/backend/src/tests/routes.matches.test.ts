import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../app';
import MatchesModel from '../../database/models/MatchesModel';

import { matches, matchesInProgressTrue } from '../mocks/matches.mock.test';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test in Matches', () => {
  beforeEach(async () => {
    sinon.stub(MatchesModel, 'findAll')
    .resolves(matches as unknown as MatchesModel[])
  })

  it('Get all Matches', async () => {
    const result = await chai.request(app).get('/matches');

    expect(result).to.have.status(200);
    expect(result.body).to.be.an('array');
    expect(result.body).to.deep.equal(matches)
  })

  
  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
})

describe('Test in Matches inProgress', () => {
  beforeEach(async () => {
    sinon.stub(MatchesModel, 'findAll')
    .resolves(matchesInProgressTrue as unknown as MatchesModel[])
  })
  it('Get all Mathes in inProgress true', async () => {
    const result = await chai.request(app).get('/matches?inProgress=true');
  
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(matchesInProgressTrue);
  })

  it('Get All Mathes in inProgress false', async () => {
    const result = await chai.request(app).get('/matches?inProgress=false');
  
    expect(result).to.have.status(200);
    expect(result.body).to.not.equal(matchesInProgressTrue);
  })
  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
})

describe('Salve in Matches', async () => {
  beforeEach(async () => {
    sinon.stub(jwt, 'verify').resolves({ id: 1 })
    sinon.stub(MatchesModel, 'create')
    .resolves({
      id: 49,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    } as unknown as MatchesModel)
  })

  it('Salve matches inProgress true', async () => {
    const result = await chai.request(app).post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    })
    expect(result).to.have.status(201);
    expect(result.body).to.deep.equal({
      id: 49,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    })
  })

  it('Test in Teams is not equals', async () => {
    const result = await chai.request(app).post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 16,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    })

    expect(result).to.have.status(422);
    expect(result.body.message).to.deep.equal('It is not possible to create a match with two equal teams');
  })

  it('Test is not create Matches with Teams that do not exist', async () => {
    const result = await chai.request(app).post('/matches').send({
      "homeTeam": 100,
      "awayTeam": 16,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    })

    expect(result).to.have.status(404);
    expect(result.body.message).to.deep.equal('There is no team with such id!');
  });

  afterEach(() => {
    (MatchesModel.create as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  })
})

describe('Finish Matches with inProgress is true', () => {
  beforeEach(async () => {
    sinon.stub(MatchesModel, 'findAll')
    .resolves(matches as unknown as MatchesModel[])
  })

  it('Finish Matches', async () => {
    const result = await chai.request(app).patch('/matches/:id/finish')

    expect(result).to.have.status(200);
    expect(result.body.message).to.deep.equal('Finished');
  })
  
  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
})

describe('Update Matches with inProgress is true', () => {
  beforeEach(async () => {
    sinon.stub(MatchesModel, 'findAll')
    .resolves(matches[0] as unknown as MatchesModel[])
  })

  it('Update Matches', async () => {
    const result = await chai.request(app).patch('/matches/1').send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
    })

    expect(result).to.have.status(200);
    expect(result.body).to.have.property('homeTeamGoals');
    expect(result.body).to.have.property('awayTeamGoals');
  })

  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
})