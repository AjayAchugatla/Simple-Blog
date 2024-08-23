

function Error(props: { text: string }) {
  return (
    <div className='text-red-500 text-sm text-center'>{props.text}</div>
  )
}

export default Error