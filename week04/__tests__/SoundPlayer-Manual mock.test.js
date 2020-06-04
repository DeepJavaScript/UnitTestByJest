import { mockPlaySoundFile } from '../js/SoundPlayer';
import SoundPlayerConsumer from '../js/SoundPlayerConsumer';
jest.mock('../js/SoundPlayer');

/*
// Calling jest.mock() with the module factory parameter

const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: mockPlaySoundFile};
  });
});
*/

describe('SoundPlayerConsumer', () => {

  beforeEach(() => {
    // Clear mock called record
    mockPlaySoundFile.mockClear();

    /*
    // Replacing the mock using mockImplementation() or mockImplementationOnce()
    SoundPlayer.mockImplementation(() => {
      return {
        playSoundFile: () => {
          throw new Error('Test error');
        },
      };
    });
    */
  });

  test('Check SoundPlayer have been called(Manual mock)', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    soundPlayerConsumer.playSomethingCool();
    expect(mockPlaySoundFile).toHaveBeenCalledWith('song.mp3');
  });
})
