module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest"
  },
  moduleNameMapper: {
    "^@api/(.*)$": "<rootDir>/apps/api/src/$1"
  }
}
