import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"

import { createAuthService } from "@api/modules/auth/auth.service"

// --- mocks ---
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn()
}))

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn()
}))

jest.mock("crypto", () => ({
  randomBytes: jest.fn()
}))

describe("AuthService", () => {
  describe("register", () => {
    const mockInput = {
      email: "email@gmail.com",
      password: "password123"
    }

    const mockUser = {
      id: "1",
      email: mockInput.email
    }

    let userRepo: any
    let sessionRepo: any

    beforeEach(() => {
      userRepo = {
        findByEmail: jest.fn(),
        create: jest.fn()
      }

      sessionRepo = {
        create: jest.fn()
      }
        ; (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password")

        ; (jwt.sign as jest.Mock).mockReturnValue("accessToken")

        ; (crypto.randomBytes as jest.Mock).mockReturnValue({
          toString: () => "refreshToken"
        })
    })

    it("should create user and return tokens", async () => {
      // Arrange
      userRepo.findByEmail.mockResolvedValue(null)
      userRepo.create.mockResolvedValue(mockUser)

      const authService = createAuthService({ userRepo, sessionRepo })

      // Act
      const result = await authService.register(mockInput)

      // Assert
      expect(userRepo.findByEmail).toHaveBeenCalledWith(mockInput.email)

      expect(bcrypt.hash).toHaveBeenCalledWith(mockInput.password, 10)

      expect(userRepo.create).toHaveBeenCalledWith({
        email: mockInput.email,
        passwordHash: "hashed-password"
      })

      expect(sessionRepo.create).toHaveBeenCalledWith(
        mockUser.id,
        "refreshToken",
        expect.any(Date)
      )

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id },
        process.env.JWT_SECRET
      )

      expect(result).toEqual({
        accessToken: "accessToken",
        refreshToken: "refreshToken"
      })
    })

    it("should throw if user already exists", async () => {
      userRepo.findByEmail.mockResolvedValue(mockUser)

      const authService = createAuthService({ userRepo, sessionRepo })

      await expect(authService.register(mockInput)).rejects.toThrow()

      expect(userRepo.create).not.toHaveBeenCalled()
    })
  })
  describe("login", () => {
    const mockInput = {
      email: "email@gmail.com",
      password: "password123"
    }

    const mockUser = {
      id: "1",
      email: mockInput.email,
      passwordHash: "hashed-password"
    }

    let userRepo: any
    let sessionRepo: any

    beforeEach(() => {
      userRepo = {
        findByEmail: jest.fn()
      }

      sessionRepo = {
        create: jest.fn()
      }

        // bcrypt
        ; (bcrypt.compare as jest.Mock).mockResolvedValue(true)

        // jwt
        ; (jwt.sign as jest.Mock).mockReturnValue("accessToken")

        // crypto
        ; (crypto.randomBytes as jest.Mock).mockReturnValue({
          toString: () => "refreshToken"
        })
    })

    it("should login successfully and return tokens", async () => {
      // Arrange
      userRepo.findByEmail.mockResolvedValue(mockUser)

      const authService = createAuthService({ userRepo, sessionRepo })

      // Act
      const result = await authService.login(mockInput)

      // Assert

      expect(userRepo.findByEmail).toHaveBeenCalledWith(mockInput.email)

      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockInput.password,
        mockUser.passwordHash
      )

      expect(sessionRepo.create).toHaveBeenCalledWith(
        mockUser.id,
        "refreshToken",
        expect.any(Date)
      )

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id },
        process.env.JWT_SECRET
      )

      expect(result).toEqual({
        accessToken: "accessToken",
        refreshToken: "refreshToken"
      })
    })

    it("should throw if user not found", async () => {
      userRepo.findByEmail.mockResolvedValue(null)

      const authService = createAuthService({ userRepo, sessionRepo })

      await expect(authService.login(mockInput)).rejects.toThrow()
    })

    it("should throw if password is invalid", async () => {
      userRepo.findByEmail.mockResolvedValue(mockUser)
        ; (bcrypt.compare as jest.Mock).mockResolvedValue(false)

      const authService = createAuthService({ userRepo, sessionRepo })

      await expect(authService.login(mockInput)).rejects.toThrow()
    })
  })
})
