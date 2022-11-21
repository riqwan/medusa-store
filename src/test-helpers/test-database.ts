import { createConnection, Connection } from "typeorm"
import path from "path"
import loadConfig from "@medusajs/medusa/dist/loaders/config"

let connection: Connection

export const testDatabase = {
  setup: async (): Promise<void> => {
    const rootDirectory = process.cwd()
    const configModule = loadConfig(rootDirectory)
    const entitiesPath = path.join(__dirname, "..", "models", "**", "*.*")
    const migrationsPath = path.join(__dirname, "..", "migrations", "**", "*.*")
    const databaseUrl = configModule.projectConfig.database_url

    connection = await createConnection({
      type: 'postgres',
      url: databaseUrl,
      entities: [entitiesPath],
      migrations: [migrationsPath],
      synchronize: true,
      dropSchema: true,
    })
  },

  destroy: async (): Promise<void> => {
    if (connection) {
      await connection.close()
    }
  },

  getConnection: (): Connection => {
    return connection
  },
}
