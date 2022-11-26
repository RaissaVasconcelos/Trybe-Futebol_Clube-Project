import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchesModel from '../database/models/MatchesModel';

// import { Response } from 'superagent';
import matches from './mocks/matches.mock.test';
// import { array } from 'joi';

describe('Test in Matches', () => {
  beforeEach(async () => {
    sinon.stub(MatchesModel, 'findAll')
    .resolves(matches as unknown as MatchesModel[])
  })
  it('Get all Matches', async () => {
    const result = await chai.request(App).get('/matches');

    expect(result).to.have.status(200);
    expect(result.body).to.be.an('array');
    expect(result).to.deep.include(matches)
  })
})