import React from 'react';
import FormGetPdf from './components/forms/FormGetPdf';
import Message from './components/Message';
import { IFormValues, IMessage } from './utils/interfaces';
import { constants } from './utils/constants';
import { apiCall } from './utils/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

interface IState {
  loading: boolean
  message: IMessage
}

const messageReducer = (state: IState, action: { type: 'loading' | 'success' | 'error', payload?: any }) => {
  switch (action.type) {
    case 'loading': {
      return { loading: true, message: { ...state.message } }
    }
    case 'success': {
      return { loading: false, message: { status: action.type, title: action.payload, time: Date.now() } }
    }
    case 'error': {
      return { loading: false, message: { status: action.type, title: action.payload, time: Date.now() } }
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}

const initialMessage: IState = { loading: false, message: { status: "success", title: "", time: 0 } }

const WebForm: React.FC = () => {
  const [state, dispatch] = React.useReducer(messageReducer, initialMessage)

  const getPdfApi = (valuesForm: IFormValues) => {
    dispatch({ type: "loading" })
    apiCall(constants.endpoints.getPdf, valuesForm)
      .then(res => {
        if (res.error) {
          dispatch({ type: "error", payload: res.error })
        } else {
          dispatch({ type: "success", payload: "PDF downloaded!" })
        }
      })
      .catch(error => dispatch({ type: "error", payload: "Internal Error" }))
  }

  return (
    <>
      <div className="square" style={{ marginTop: "-150px" }}>
        <div className="squareTitle">Enter the website to be transformed</div>
        <div className="squareBody">
          <FormGetPdf onSubmit={getPdfApi} loading={state.loading} />
        </div>
      </div>
      <Message messageProps={state.message} />
    </>
  )
}

const App: React.FC = () => {
  console.log("ENV::: ", process.env.NODE_ENV)
  return (
    <>
      <h1 className="title">Web to PDF</h1>
      <WebForm />
    </>
  );
}

export default App;
