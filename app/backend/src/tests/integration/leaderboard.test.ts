import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../app';
import MatchesModel from '../../database/models/MatchesModel';

import { matchesAll, matchesHome, matchesAway } from '../mocks/leaderboard.mock.test';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test in Learderboard', () => {
  beforeEach(async () => {
    sinon.stub(MatchesModel, 'findAll')
    .resolves(matchesAll as unknown as MatchesModel[])
  })
  it('Test in classification all Matches', async () => {
    const result = await chai.request(app).get('/leaderboard');

    expect(result).to.have.status(200);
    expect(result.body).to.deep.include(matchesAll[0]);
  });

  it('Test in classification all Matches Home', async () => {
    const result = await chai.request(app).get('/leaderboard/home');

    expect(result).to.have.status(200);
    expect(result.body).to.deep.include(matchesHome[0]);
  });

  it('Test in classification all Matches Away', async () => {
    const result = await chai.request(app).get('/leaderboard/away');

    expect(result).to.have.status(200);
    expect(result.body).to.deep.include(matchesAway[0]);
  });

  afterEach(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })
});
