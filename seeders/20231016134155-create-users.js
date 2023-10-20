"use strict"

const { User } = require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", [
			{
				name: "Superadmin",
				address: "Jakarta",
				role: "superadmin",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])

		const users = await User.findAll()

		await queryInterface.bulkInsert(
			"Auths",
			[
				{
					email: "superadmin@mail.com",
					password:
						"$2a$12$i.coFAf.4vGGrLhUV/26/uV2/Ce.OmwiFcP0pDmuLqVMmlcgkbV2K", // password: superadmin
					userId: users[0].id,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {})
		await queryInterface.bulkDelete("Auths", null, {})
	},
}
