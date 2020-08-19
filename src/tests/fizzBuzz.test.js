const fizzBuzz = require('../components/FizzBuzz/fizzBuzz')


describe('fizzBuzz()', () => {
    it('return "FizzBuzz" for multiples of 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz')
        expect(fizzBuzz(30)).toBe('FizzBuzz')
    })

    it('return "FizzBuzz" for multiples of 5', () => {
        expect(fizzBuzz(5)).toBe('Buzz')
        expect(fizzBuzz(10)).toBe('Buzz')
    })

    it('return "FizzBuzz" for multiples of 3', () => {
        expect(fizzBuzz(3)).toBe('Fizz')
        expect(fizzBuzz(9)).toBe('Fizz')
    })

    it('returns the given number for multiples of neither 3 nor 5', () => {
        expect(fizzBuzz(1)).toBe('1')
        expect(fizzBuzz(22)).toBe('22')
    })
})