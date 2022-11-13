import { createConnection, Connection } from "typeorm"
import path from "path"

let connection: Connection

export const testDatabase = {
  setup: async (): Promise<void> => {
    const entitiesPath = path.join(__dirname, "..", "models", "**", "*.*")
    const migrationsPath = path.join(__dirname, "..", "migrations", "**", "*.*")
    const databaseUrl = "postgres://postgres:postgres@postgres:5432/medusa-docker-test"

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
