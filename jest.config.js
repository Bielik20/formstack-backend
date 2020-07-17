module.exports = {
    roots: ['<rootDir>/__tests__'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsConfig: '__tests__/tsconfig.json',
        },
    },
    moduleNameMapper: {
        '@src/(.*)$': '<rootDir>/src/$1',
    },
};
