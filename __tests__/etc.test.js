import sum from '../_inqubating/sum';
import mul from '../_inqubating/mul';
describe('ETC', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('mul 3 * 4 to equal 12', () => {
    expect(mul(3, 4)).toBe(12);
  });

  it('mock setTimeout test45', async () => {
    console.time('waiting for test');

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    expect(1).toBe(1);
  });
});