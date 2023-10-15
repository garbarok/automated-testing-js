const { expect } = require('chai');
const NumbersValidator = require('../NumbersValidator');

describe('NumbersValidator', () => {
  const validator = new NumbersValidator();

  describe('isNumberEven()', () => {
    it('should return true for even numbers', () => {
      expect(validator.isNumberEven(4)).to.be.true;
      expect(validator.isNumberEven(0)).to.be.true;
    });

    it('should return false for odd numbers', () => {
      expect(validator.isNumberEven(3)).to.be.false;
    });

    it('should throw error for non-number values', () => {
      expect(() => validator.isNumberEven('text')).to.throw();
    });
  });

  describe('getEvenNumbersFromArray()', () => {
    it('should filter even numbers from array', () => {
      const result = validator.getEvenNumbersFromArray([1, 2, 3, 4]);
      expect(result).to.eql([2, 4]);
    });

    it('should throw error for arrays with non-number values', () => {
      expect(() => validator.getEvenNumbersFromArray([1, 'text', 3])).to.throw();
    });

    it('should throw error for non-array values', () => {
      expect(() => validator.getEvenNumbersFromArray('text')).to.throw();
    });
  });

  describe('isAllNumbers()', () => {
    it('should return true for arrays with all numbers', () => {
      expect(validator.isAllNumbers([1, 2, 3])).to.be.true;
    });

    it('should return false for arrays with any non-number', () => {
      expect(validator.isAllNumbers([1, 'text', 3])).to.be.false;
    });

    it('should throw error for non-array values', () => {
      expect(() => validator.isAllNumbers('text')).to.throw();
    });
  });

  describe('isInteger()', () => {
    it('should return true for integers', () => {
      expect(validator.isInteger(1)).to.be.true;
      expect(validator.isInteger(-5)).to.be.true;
    });

    it('should return false for non-integers', () => {
      expect(validator.isInteger(1.5)).to.be.false;
    });

    it('should throw error for non-number values', () => {
      expect(() => validator.isInteger('text')).to.throw();
    });
  });
});
