import { UrlsafePipe } from './urlsafe.pipe';

describe('UrlsafePipe', () => {
  it('create an instance', () => {
    const pipe = new UrlsafePipe();
    expect(pipe).toBeTruthy();
  });
});
