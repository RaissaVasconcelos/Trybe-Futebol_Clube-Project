import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchesModel from '../database/models/MatchesModel';

import { matches, matchesInProgressTrue } from './mocks/matches.mock.test';

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
    expect(result).to.deep.include(matches)
  })

  it('Get all Mathes in inProgress true', async () => {
    const result = await chai.request(app).get('/matches?inProgress=true');

    expect(result).to.have.status(200);
    expect(result).to.deep.include( expect(result).to.deep.include(matchesInProgressTrue))
  })

  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
})