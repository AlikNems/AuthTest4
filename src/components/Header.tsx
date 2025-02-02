
import '@/styles/index.css'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className="bg-gray-500 w-screen h-[10vh] flex items-center justify-center gap-[2vw] border-b-2 border-black">

      <Button variant="secondary" size="lg" >Удалить</Button>
      <Button variant="secondary" size="lg">Удалить</Button>

    </div>
  )
}

export default Header
