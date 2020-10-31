import { Token, TokenType } from '../types';
import { ALL_RULES, parseEslintRules } from './eslintParser';

const ruleLine = 123;
const tokenFactory = (value: string): Token => ({
  type: TokenType.LineComment,
  value,
  loc: { start: { line: ruleLine, column: 1 }, end: { line: 2, column: 3 } },
});
const filePath = 'filePath';
describe('EslintParser', () => {
  it('returns the eslint rule formatted', async () => {
    const [eslintRule] = parseEslintRules(
      [tokenFactory('eslint-disable-next-line no-shadow')],
      filePath,
    );

    expect(eslintRule).toEqual({
      rule: 'no-shadow',
      file: filePath,
      line: ruleLine,
    });
  });

  it('returns the correct rule even with extra spaces', async () => {
    const [eslintRule] = parseEslintRules(
      [tokenFactory('  eslint-disable-next-line   no-shadow  ')],
      filePath,
    );

    expect(eslintRule.rule).toEqual('no-shadow');
  });

  it('returns the rules', async () => {
    const eslintRules = parseEslintRules(
      [tokenFactory('eslint-disable-next-line no-shadow,prefer-const')],
      filePath,
    );

    expect(eslintRules[0].rule).toEqual('no-shadow');
    expect(eslintRules[1].rule).toEqual('prefer-const');
  });

  it('returns the correct rules even with extra spaces', async () => {
    const eslintRules = parseEslintRules(
      [
        tokenFactory(
          '  eslint-disable-next-line   no-shadow  ,  prefer-const ',
        ),
      ],
      filePath,
    );

    expect(eslintRules[0].rule).toEqual('no-shadow');
    expect(eslintRules[1].rule).toEqual('prefer-const');
  });

  it('returns ALL_RULES as rule if no rule is specified', async () => {
    const [eslintRule] = parseEslintRules(
      [tokenFactory('eslint-disable')],
      filePath,
    );

    expect(eslintRule.rule).toEqual(ALL_RULES);
  });

  it('returns ALL_RULES as rule if no rule is specified even with extra spaces', async () => {
    const [eslintRule] = parseEslintRules(
      [tokenFactory('  eslint-disable  ')],
      filePath,
    );

    expect(eslintRule.rule).toEqual(ALL_RULES);
  });

  it('returns flatten rules of tokens', async () => {
    const eslintRules = parseEslintRules(
      [
        tokenFactory('eslint-disable'),
        tokenFactory('eslint-disable-next-line no-shadow, prefer-const'),
        tokenFactory('eslint-disable-next-line no-shadow'),
      ],
      filePath,
    );

    expect(eslintRules[0].rule).toEqual(ALL_RULES);
    expect(eslintRules[1].rule).toEqual('no-shadow');
    expect(eslintRules[2].rule).toEqual('prefer-const');
    expect(eslintRules[3].rule).toEqual('no-shadow');
  });
});
