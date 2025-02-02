
import '@/styles/app.css'
import LogInForm from './components/LogInForm'
import RegistrationForm from './components/RegistrationForm'

function App() {


  return (
  <div className='w-screen bg-gray-700 h-[85vh]'>
<RegistrationForm/>
<LogInForm/>
  </div>
  )
}

export default App
