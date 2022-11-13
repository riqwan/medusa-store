import express from "express"
import { Express } from "express"
import getPort from "get-port"
import axios from "axios"
import routes from '../api'

let app: Express
let port: number
let runningProcess: any

export const setupTestServer = {
  setup: async (): Promise<void> => {
    app = express()
    port = await getPort()

    runningProcess = app.listen(port, () => {
      (<any> process).send(port)
    })
  },

  destroy: async (): Promise<void> => {
    await runningProcess.close()
  },

  getApp: (): Express => {
    return app
  },

  getPort: (): number => {
    return port
  },

  getApi: () => {
    return axios.create({ baseURL: `http://localhost:${port}` });
  },
}
