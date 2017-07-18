import { EVRPage } from './app.po';

describe('evr App', () => {
  let page: EVRPage;

  beforeEach(() => {
    page = new EVRPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
