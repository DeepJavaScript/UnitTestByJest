import SoundPlayer from '../js/SoundPlayer';
import SoundPlayerConsumer from '../js/SoundPlayerConsumer';
jest.mock('../js/SoundPlayer');

describe('SoundPlayerConsumer', () => {

  beforeEach(() => {
    // Clear mock called record
    SoundPlayer.mockClear();
  });

  test('Check SoundPlayer have been called(Automatic mock)', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
  });
})
