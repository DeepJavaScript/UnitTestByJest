import rendererLinkElement from '../src/linkElement';

describe('external snapshots', () => {
  it('renders correctly', () => {
    // let url = 'https://titangene.github.io/';
    // let linkName = 'Titangene Blog';
    let url = 'https://www.google.com/';
    let linkName = 'Google';
  
    let actual = rendererLinkElement(url, linkName);
  
    expect(actual).toMatchSnapshot();
  });

  it('renders correctly 2', () => {
    // let url = 'https://titangene.github.io/';
    // let linkName = 'Titangene Blog';
    let url = 'https://www.google.com/';
    let linkName = 'Google1';
  
    let actual = rendererLinkElement(url, linkName);
  
    expect(actual).toMatchSnapshot();
  });
});