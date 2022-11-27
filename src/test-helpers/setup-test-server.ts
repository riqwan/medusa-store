import express from "express"
import { Express } from "express"
import getPort from "get-port"
import axios from "axios"
import { MedusaContainer } from "@medusajs/medusa/dist/types/global"
import { asValue, createContainer } from "awilix"
import loadConfig from "@medusajs/medusa/dist/loaders/config"
import routes from '../api'
import { ContainerRegister } from '../types/tests'
import supertest from "supertest"
import bodyParser from "body-parser"

let app: Express
let port: number
let runningProcess: any
let container: MedusaContainer
let medusaConfig: any

export const setupTestServer = {
  setup: async (containerRegisters: ContainerRegister[] = []): Promise<void> => {
    medusaConfig = loadConfig(process.cwd())
    app = express()
    port = await getPort()
    container = createContainer() as MedusaContainer

    containerRegisters.forEach((containerRegister) => {
      container.register(containerRegister.name, asValue(containerRegister.instance))
    })

    container.register("configModule", asValue(medusaConfig))
    container.register({
      logger: asValue({
        error: () => {},
      }),
    })

    app.set("trust proxy", 1)
    app.use((req: any, res, next) => {
      req.session = {}
      const data = req.get("Cookie")
      if (data) {
        req.session = {
          ...req.session,
          ...JSON.parse(data),
        }
      }
      next()
    })

    app.use((req: any, res, next) => {
      req.scope = container.createScope()
      next()
    })

    app.use(bodyParser.json())
    app.use("/", routes())

    const supertestRequest = supertest(app)

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
