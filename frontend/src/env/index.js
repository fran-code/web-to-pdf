import development from './development'
import production from './production'

const joinEnv = { development, production }
const env = joinEnv[process.env.NODE_ENV]

export default env