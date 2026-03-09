import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'

import saga from './saga'
import reducer from './slice'

const ConfigureStoreFunction = () => {
  const sagaMiddleWare: SagaMiddleware<object> = createSagaMiddleware({})
  const middleware: SagaMiddleware<object>[] = [sagaMiddleWare]

  const store = configureStore({
    reducer,
    middleware
  })

  sagaMiddleWare.run(saga)

  return store
}

export default ConfigureStoreFunction