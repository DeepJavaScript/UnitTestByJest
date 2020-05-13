import CaesarCipher from '../src/CaesarCipher';
import { mockMomentDateTime } from '../__mocks__/moment';

// const mockMomentDateTime = '2020-xx-xx';



describe('凱撒加密', () => {
  describe('位移量預設為 0', () => {
    
    test('輸入 "ABC"，輸出 "ABC"', () => {
      // Arrange
      let offset = 0;
      let input = "ABC";
      let expected = `ABC ${mockMomentDateTime}`;

      // Act
      let actual = CaesarCipher(input);

      // Assert
      expect(actual).toBe(expected);
      expect(CaesarCipher.offset).toBe(offset);
      expect(CaesarCipher.input).toBe(input);
    });

    test('輸入 "XYZ"，輸出 "XYZ"', () => {
      // Arrange
      let offset = 0;
      let input = "XYZ";
      let expected = `XYZ ${mockMomentDateTime}`;

      // Act
      let actual = CaesarCipher(input);

      // Assert
      expect(actual).toBe(expected);
      expect(CaesarCipher.offset).toBe(offset);
      expect(CaesarCipher.input).toBe(input);
    });
  });

  describe('位移量設為 2', () => {
    beforeEach(() => {
      let offset = 0;
      CaesarCipher.config(offset);
    });

    test('輸入 "ABC"，輸出 "CDE"', () => {
      // Arrange
      let offset = 2;
      let input = "ABC";
      let expected = `CDE ${mockMomentDateTime}`;

      // Act
      CaesarCipher.config(offset);
      let actual = CaesarCipher(input);

      // Assert
      expect(actual).toBe(expected);
      expect(CaesarCipher.offset).toBe(offset);
      expect(CaesarCipher.input).toBe(input);
    });

    test('輸入 "Rgrl"，輸出 "Titn"', () => {
      // Arrange
      let offset = 2;
      let input = "Rgrl";
      let expected = `Titn ${mockMomentDateTime}`;

      // Act
      CaesarCipher.config(offset);
      let actual = CaesarCipher(input);

      // Assert
      expect(actual).toBe(expected);
      expect(CaesarCipher.offset).toBe(offset);
      expect(CaesarCipher.input).toBe(input);
    });
  });

  describe('位移量設為 5', () => {
    test('輸入 "ABC"，輸出 "FGH"', () => {
      // Arrange
      let offset = 5;
      let input = "ABC";
      let expected = `FGH ${mockMomentDateTime}`;

      // Act
      CaesarCipher.config(offset);
      let actual = CaesarCipher(input);

      // Assert
      expect(actual).toBe(expected);
      expect(CaesarCipher.offset).toBe(offset);
      expect(CaesarCipher.input).toBe(input);
    });
  });

  // describe('位移量設為 25', () => {
  //   test('輸入 "ABC"，輸出 "FGH"', () => {
  //     // Arrange
  //     let offset = 25;
  //     let input = "ABC";
  //     let expected = "FGH";

  //     // Act
  //     CaesarCipher.config(offset);
  //     let actual = CaesarCipher(input);

  //     // Assert
  //     expect(actual).toBe(expected);
  //     expect(CaesarCipher.offset).toBe(offset);
  //     expect(CaesarCipher.input).toBe(input);
  //   });
  // });
});