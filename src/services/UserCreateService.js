const { hash } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const hashedPassword = await hash(password, 8)

    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Esse e-mail já está cadastrado!')
    }

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return userCreated
  }
}

module.exports = UserCreateService
