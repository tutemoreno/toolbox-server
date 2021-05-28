import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;

import app from '../src/index.js';

describe('ToolBox', function () {
  it('GET/iecho/messages no results', (done) => {
    request(app)
      .get('/iecho/messages')
      .end((err, res) => {
        const json = JSON.parse(res.text);

        expect(res.status).to.be.equal(200);
        expect(json).to.deep.equal({ messages: [] });

        done();
      });
  });

  it('GET/iecho?text=no text [FAIL]', (done) => {
    request(app)
      .get('/iecho?text=')
      .end((err, res) => {
        const json = JSON.parse(res.text);

        expect(res.status).to.be.equal(400);
        expect(json).to.deep.equal({ error: 'no text' });

        done();
      });
  });

  it('GET/iecho?text=HelloWorld', (done) => {
    request(app)
      .get('/iecho?text=HelloWorld')
      .end((err, res) => {
        const json = JSON.parse(res.text);

        delete json._id;

        expect(res.status).to.be.equal(200);
        expect(json).to.deep.equal({
          text: 'dlroWolleH',
          isPalidrome: false,
        });

        done();
      });
  });

  it('GET/iecho?text=Lorem', (done) => {
    //Lorem ipsum 30
    request(app)
      .get(
        '/iecho?text=Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate, massa ac vehicula fringilla, ligula odio vehicula nunc, vitae cursus sem nibh ac dui. Sed non semper tortor, ac pretium.'
      )
      .end((err, res) => {
        const json = JSON.parse(res.text);

        delete json._id;

        expect(res.status).to.be.equal(200);
        expect(json).to.deep.equal({
          text: '.muiterp ca ,rotrot repmes non deS .iud ca hbin mes susruc eativ ,cnun alucihev oido alugil ,allignirf alucihev ca assam ,etatupluv essidnepsuS .tile gnicsipida rutetcesnoc ,tema tis rolod muspi meroL',
          isPalidrome: false,
        });

        done();
      });
  });

  it('GET/iecho?text=yohagoyogahoy', (done) => {
    request(app)
      .get('/iecho?text=yohagoyogahoy')
      .end((err, res) => {
        const json = JSON.parse(res.text);

        delete json._id;

        expect(res.status).to.be.equal(200);
        expect(json).to.deep.equal({
          text: 'yohagoyogahoy',
          isPalidrome: true,
        });

        done();
      });
  });

  it('GET/iecho/messages list ordered', (done) => {
    request(app)
      .get('/iecho/messages')
      .end((err, res) => {
        const json = JSON.parse(res.text);

        json.messages.forEach((e) => delete e._id);

        expect(res.status).to.be.equal(200);
        expect(json).to.deep.equal({
          messages: [
            {
              text: 'yohagoyogahoy',
              isPalidrome: true,
            },
            {
              text: '.muiterp ca ,rotrot repmes non deS .iud ca hbin mes susruc eativ ,cnun alucihev oido alugil ,allignirf alucihev ca assam ,etatupluv essidnepsuS .tile gnicsipida rutetcesnoc ,tema tis rolod muspi meroL',
              isPalidrome: false,
            },
            {
              text: 'dlroWolleH',
              isPalidrome: false,
            },
          ],
        });

        done();
      });
  });
});
