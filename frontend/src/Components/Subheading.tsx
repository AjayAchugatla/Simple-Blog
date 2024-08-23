import { Link } from "react-router-dom"
function Subheading(props: { content: string, to: string }) {
  return (
    <div className='text-sm text-center text-gray-400 flex gap-1 mt-1'>
      {props.content + " "}
      <Link to={'/' + props.to} className="underline">{props.to === 'signin' ? 'Login' : 'Signup'}</Link>
    </div>
  )
}

export default Subheading