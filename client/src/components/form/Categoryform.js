import React from 'react'

const Categoryform = ({value, setValue , handleSubmit}) => {
  return (
    <div >
    <form  onSubmit={handleSubmit}>
    <input  type='text' placeholder='Enter your category' value={value} onChange={(e)=> setValue(e.target.value)} />
    <button type='submit'>submit</button>
    </form>
</div>
  )
}

export default Categoryform