/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts)$',
    moduleFileExtensions: ['ts', 'js'],
  }
}
